import doc_diff_utils
import re
from tika import parser


def find_phrase(phrase, lines):
    """Find a phrase in a given list of lines.

    Given a list of lines, find the first one that contains the given
    phrase.

    Keyword arguments:
    phrase -- the phrase to search for
    lines -- the list of lines in which to search
    """
    found_phrase = [(index, word)
                    for index, word
                    in enumerate(lines)
                    if phrase in word]
    return found_phrase


def massage_text(some_text):
    """Substitute various parts of the full text to make it easier to digest

    The raw text that comes back from tika is... pretty ugly. Lots of line
    breaks in places they shouldn't be, etc. This attempts to process the
    text via a series of re.sub calls to make the resulting text easier to
    diff.
    """
    fixed_text = re.sub(r'\s+\d{1,2}\s+', r'\n\n', some_text)

    # HEY IDIOT THIS IS NOT ROBUST EVEN A LITTLE. Talk to Me-Me and
    # see if you can make it not suck shit. Literally only hits
    # Example D in Missed Trigger.
    fixed_text = re.sub(r'(?<=[D]\.)(.+\.)\s+(They.+)', r'\1 \2', fixed_text)

    fixed_text = re.sub(r'([a-z,])\s?\n+\s?([a-zA-Z][^\.])',
                        r'\1 \2',
                        fixed_text)

    fixed_text = re.sub(r'(\.)\s+([A-Z]\.)', r'\1\n\2', fixed_text)

    fixed_text = re.sub(r'Philosophy (.)', r'Philosophy\n\1', fixed_text)

    fixed_text = re.sub(r'Additional Remedy (.)',
                        r'Additional Remedy\n\1',
                        fixed_text)

    fixed_text = re.sub(r'(\d\.\d\..*)'
                        r'(Match Loss|Warning|Disqualification|No Penalty)'
                        r'(Definition)',
                        r'\1\n\2\n\3\n',
                        fixed_text)

    return fixed_text


def extract_lines(some_file, doc_flag):
    """Get lines from a file.

    'lines' here is basically either a header or paragraph; something that
    is easily processible without extraneous whitespace.

    Keyword arguments:
    some_file -- the file to parse
    doc_flag -- 'ipg' or 'mtr', the two flavors of docs we're using this for
    """
    parsedPDF = parser.from_file(some_file)
    text = parsedPDF['content']
    text = massage_text(text)

    lines = re.findall(r'\S+|\n', text)

    lines = ' '.join(lines).split('\n \n')

    if doc_flag is 'ipg':
        key_start_phrase = '1. GENERAL PHILOSOPHY'
        key_end_phrase = 'APPENDIX A'

    if doc_flag is 'mtr':
        return

    starting_section = find_phrase(key_start_phrase, lines)
    ending_section = find_phrase(key_end_phrase, lines)
    starting_index, _ = starting_section[0]
    ending_index, _ = ending_section[0]

    lines = trim_excess_text(lines[starting_index:ending_index + 1], 'ipg')
    return lines


def trim_excess_text(some_list, doc_flag):
    """Chops extraneous words off starting/ending lines

    Because of the way we're handling getting lines in extract_lines,
    our lines aren't perfectly starting where we want -- we get a lot of
    extra stuff before where we want to start, and some extra stuff after
    where we want to end. This lets us trim that off, so the working text
    we end up parsing is, for our purposes, about as close to perfect as
    we can manage.

    Keyword arguments:
    some_list -- the list to trim
    doc_flag -- 'ipg' or 'mtr', the two flavors of docs we're using this for
    """
    if doc_flag is 'ipg':
        some_list[0] = some_list[0][some_list[0].index('1.'):]
        some_list[-1] = some_list[-1][:some_list[-1].index('APPENDIX')]
    if doc_flag is 'mtr':
        return
    return some_list


old_lines = extract_lines('oldipg', 'ipg')
new_lines = extract_lines('newipg', 'ipg')

# for idx, line in enumerate(lines):
#     print(line, '\n')
for x in zip(old_lines, new_lines):
    doc_diff_utils.diff_docs(x, x)
