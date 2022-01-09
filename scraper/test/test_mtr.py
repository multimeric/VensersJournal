from scraper.vensers_journal_mtr_scraper.mtr import get_mtr, Section
import datetime
import re


def test_parse_mtr():
    mtr = get_mtr()

    # The effective date should have the right type
    assert isinstance(mtr.effective, datetime.date)
    assert mtr.sections[0].metadata.name == "Introduction"

    for i, section in enumerate(mtr.sections):
        assert isinstance(section, Section)
        # Have to disable this for now because of chapter 3.8
        assert len(section.content) > 10
        if i > 1:
            # Ensure we haven't skipped a section
            curr_num = re.split("[.\s]", section.metadata.num)
            prev_num = re.split("[.\s]", mtr.sections[i - 1].metadata.num)

            # One of the numbers or letters in the section number must be greater than the previous
            if "Appendix" in section.metadata.num:
                assert curr_num[1] > prev_num[1]
            else:
                assert int(curr_num[0]) > int(prev_num[0]) or int(curr_num[1]) > int(prev_num[1])
