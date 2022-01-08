from scraper.vensers_journal_mtr_scraper.mtr_grammar import *
import datetime


def test_parse_toc_appendix():
    ret = toc_entry.parse_string(
        'Appendix D—Recommended Draft Booster Mix for Limited Tournaments ...........................................................53'
    )
    assert ret[0] == TocEntry(page=53, section="Appendix D—Recommended Draft Booster Mix for Limited Tournaments")


def test_parse_toc_normal():
    ret = toc_entry.parse_string(
        '9.3  Play-Draw Rule ..........................................................................................................................................41'
    )
    assert ret[0] == TocEntry(page=41, section="9.3  Play-Draw Rule")


def test_parse_header():
    ret = header.parse_string('''
MAGIC: THE GATHERING® TOURNAMENT RULES 
Effective November 19, 2021 
    ''')
    assert ret[0] == Effective(effective=datetime.date(year=2021, month=11, day=19))


def test_parse_toc_chapter():
    ret = toc_entry.parse_string(
        '5.  Tournament Violations ........................................................................................................................................27'
    )

    assert ret[0] == TocEntry(section="5.  Tournament Violations", page=27)
