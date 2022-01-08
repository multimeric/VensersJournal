from pyparsing import *
from pyparsing import common
import datetime
from dataclasses import dataclass

@dataclass
class TocEntry:
    """
    One entry in the table of contents, indicating on which page a section can be found
    """
    section: str
    page: int

@dataclass
class PageNumber:
    """
    A page number
    """
    num: int

@dataclass
class SectionNumber:
    """
    The "number" for a section (not an actual number), e.g. `4.2` or `Appendix A`
    """
    num: str

@dataclass
class SectionHeader:
    """
    The header for a section, e.g. `10.1 Participation Minimums`
    """
    num: str
    name: str

@dataclass
class ChapterHeader:
    """
    The header for a chapter, e.g. `10. Sanctioning Rules`
    """
    num: int
    name: str

@dataclass
class Effective:
    """
    The effective date for the MTR
    """
    effective: datetime.date

@dataclass
class TextContent:
    """
    Wrapper class for raw text
    """
    content: str

# num = Word(nums).set_parse_action(
#     lambda s, loc, toks: int(toks[0])
# )
text_word = Word(alphas)
#: e.g. 23
page_num = (common.integer.copy() + LineEnd().suppress()).set_parse_action(
    lambda s, loc, toks: PageNumber(int(toks[0]))
)
#: e.g. `2.13`. Returns the number as a raw string
section_num = original_text_for(common.integer + OneOrMore(Literal(".") + common.integer)).add_parse_action(
    lambda s, loc, toks: SectionNumber(toks[0].strip())
)
#: Certain section numbers are in their own text element in the PDF, so we have to parse them in isolation
standalone_section_num = (StringStart().suppress() + section_num + StringEnd().suppress()).set_parse_action(
    lambda s, loc, toks: toks[0]
)
#: e.g. `Appendix A`. Returns the number as a raw string
appendix_prefix = (original_text_for("Appendix" + Word(alphas, exact=1)) + Literal("—").suppress()).set_parse_action(
    lambda s, loc, toks: SectionNumber(toks[0])
)
header = ("MAGIC: THE GATHERING® TOURNAMENT RULES" + lineEnd() + "Effective" + original_text_for(Word(alphas) + common.integer + "," + common.integer)).set_parse_action(
    lambda s, loc, toks: Effective(datetime.datetime.strptime(toks[-1], "%B %d, %Y").date())
)
#: e.g. 2.
chapter_num = common.integer.copy() + Literal(".").suppress()
#: e.g. 10. Sanctioning Rules
chapter_header = (chapter_num + original_text_for(OneOrMore(text_word)) + LineEnd().suppress()).set_parse_action(
    lambda s, loc, toks: ChapterHeader(
        num = toks[0],
        name=toks[-1]
    )
)
#: e.g. 2.11  Taking Notes ......................13
toc_entry = ((section_num | chapter_num | "Appendix" | "Introduction") + SkipTo(".", include=False).suppress() + Literal(".")[10, ...].suppress() + page_num).set_parse_action(lambda s, loc, toks: TocEntry(
    section=toks[0],
    page=toks[1]
))
toc = delimited_list(toc_entry, LineEnd()).add_parse_action(
    lambda s, loc, toks: [toks]
)
#: e.g. Appendix A—Changes From Previous Versions
section_header = ((section_num | appendix_prefix) + Opt(LineEnd()).suppress() + original_text_for(OneOrMore(text_word)) + LineEnd().suppress()).set_parse_action(
    lambda s, loc, toks: SectionHeader(
        num=toks[0].num,
        name=toks[-1].strip('\n')
    )
)
introduction_header = (Literal("Introduction") + LineEnd().suppress()).set_parse_action(
    lambda s, loc, toks: SectionHeader(
        num=None,
        name =toks[0]
    )
)
text_line = (... + StringEnd()).set_parse_action(
    lambda s, loc, toks: TextContent(content=toks[0])
)
content = toc | header | chapter_header | section_header | introduction_header | page_num | standalone_section_num | text_line

# mtr_grammar = header + effective + content
