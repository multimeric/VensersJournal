import datetime
import sys

import requests
from pdfminer import high_level
import bs4
from typing import Union, IO, List
from io import BytesIO
from vensers_journal_mtr_scraper.mtr_grammar import content, Effective, SectionHeader, TextContent, SectionNumber
from dataclasses import dataclass, is_dataclass, asdict
import json

from pdfminer.layout import LTTextContainer


@dataclass
class Section:
    """
    One section of the MTR (a subsection, ie 1.3, not a chapter such as 1.)
    """
    name: SectionHeader
    content: str


@dataclass
class Mtr:
    """
    A parsed representation of the MTR
    """
    effective: datetime.date
    sections: List[Section]


def get_latest_pdf() -> str:
    """
    Returns: URL to the latest MTR PDF file
    """
    req = requests.get("https://wpn.wizards.com/en/document/magic-gathering-tournament-rules")
    soup = bs4.BeautifulSoup(req.text, features="html.parser")
    link = soup.select_one("span.file>a")
    return link['href']


def mtr_parse(pdf: Union[str, IO]) -> list:
    """
    Args:
        pdf: File object or file path to the MTR pdf

    Returns:
        A list of elements from the MTR

    """
    # return high_level.extract_text(pdf)
    toks = []
    for page in high_level.extract_pages(pdf):
        for element in page:
            if isinstance(element, LTTextContainer):
                parsed = content.parse_string(element.get_text())[0]
                toks.append(parsed)
    return toks


def process_elements(els: list) -> Mtr:
    """
    Args:
        els: List of elements returned by mtr_parse

    Returns: An instance of the Mtr class
    """
    mtr = Mtr(
        effective=None,
        sections=[]
    )
    for i, el in enumerate(els):
        if isinstance(el, TextContent):
            if i > 0 and isinstance(els[i - 1], SectionNumber):
                mtr.sections.append(
                    Section(
                        name=SectionHeader(name=el.content.strip(), num=els[i - 1].num),
                        content=""
                    )
                )
                continue
            if el.content:
                mtr.sections[-1].content += el.content
        elif isinstance(el, SectionHeader):
            mtr.sections.append(
                Section(
                    name=el,
                    content=""
                )
            )
        elif isinstance(el, Effective):
            mtr.effective = el.effective
    return mtr


def get_mtr() -> Mtr:
    url = get_latest_pdf()
    pdf = requests.get(url)
    pdf_buffer = BytesIO(pdf.content)
    els = mtr_parse(pdf_buffer)
    return process_elements(els)

class DataclassJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if is_dataclass(o):
            return asdict(o)
        elif isinstance(o, datetime.date):
            return o.isoformat()
        return super().default(o)

def main():
    # Write object to stdout when run as script
    mtr = get_mtr()
    json.dump(mtr, sys.stdout, cls=DataclassJSONEncoder, indent=4)

if __name__ == '__main__':
    main()
