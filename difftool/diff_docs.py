import re
import sys


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


def extract_lines(some_file, doc_flag):
    """Get lines from a file.

    'lines' here is basically either a header or paragraph; something that
    is easily processible without extraneous whitespace.

    Keyword arguments:
    some_file -- the file to parse
    doc_flag -- 'ipg' or 'mtr', the two flavors of docs we're using this for
    """
    with open(some_file, 'r') as raw:
        doc = raw.read()

    lines = re.findall(r'\S+|\n', doc)
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

    return lines[starting_index:ending_index+1]


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


old_doc, new_doc = sys.argv[1], sys.argv[2]

with open(old_doc, 'r', encoding='utf-16') as ugh:
    old_doc = ugh.read()

lines = re.findall(r'\S+|\n', old_doc)
lines = ' '.join(lines).split('\n \n')

for idx, line in enumerate(lines):
    print(idx, '--', line, '\n')
# old_doc = extract_lines(old_doc, 'ipg')
# new_doc = extract_lines(new_doc, 'ipg')

# old_doc = trim_excess_text(old_doc, 'ipg')
# new_doc = trim_excess_text(new_doc, 'ipg')

# for idx, line in enumerate(old_doc):
#     print(idx, '--', line)
