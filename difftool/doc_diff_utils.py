import difflib
import re

from pathlib import Path


def get_readable_header(first_file, second_file):
    """Get the readable names from input files.

    We want our eventual final output to include headers so that people
    can easily see what versions we're diffing between. This grabs the
    files' relevant parts -- which here is /folder/{THIS PART}.extension
    for display purposes.

    Keyword arguments:
    first_file -- the file we're diffing from
    second_file -- the file we're diffing to
    """
    from_name = Path(first_file).stem
    to_name = Path(second_file).stem

    return {'old': from_name, 'new': to_name}


def wrap_slice(rule_slice, status):
    """Wrap the changed rules text in tags for JSON to parse.

    This allows us to highlight changes programmatically. Javascript can
    replace the old_start, new_start, etc tags with their proper <span>
    tags in the generated HTML. Easier to handle there than here.

    Note this does NOT differentiate between inserts, replaces, deletions
    like a general diff tool.

    Keyword arguments:
    rule_slice -- the chunk of the rule that indicates a change
    status -- whether the slice belongs to an 'old' rule or a 'new' rule.
    """
    if not rule_slice:
        return ''
    if re.match('^^(?:rules? )?'
                '\d{3}(?:\.\d+[a-z]*)*'
                '(?:–\d{3}(?:\.\d+[a-z]?)?)?\)?\.?',
                ' '.join(rule_slice)):
        return rule_slice

    if status == 'old':
        return ['old_start', *rule_slice, 'old_end']
    else:
        return ['new_start', *rule_slice, 'new_end']


def diff_docs(old_doc, new_doc):
    """Determine how two given rules differ.

    A few things happening here:
    1. First, determine if the rule has a partner
    2. If it has a partner, make sure its partner isn't identical to it,
       so we don't waste time diffing things we can already determine to
       be the same.
    3. Once we have rules we know needs to be diffed, wrap the changes slices
       using diff_utils.wrap_slice, tidy up the strings

    Keyword arguments:
    old_rule -- the old rule to compare from
    new_rule -- the new rule to compare to
    """
    seq = difflib.SequenceMatcher(None, old_doc, new_doc)
    matches = seq.get_matching_blocks()

    modded_old, modded_new = [], []
    old_offset, new_offset = 0, 0

    # via difflib docs: matching blocks come in a tuple such that
    # old_rule[o:o+i] == new_rule[n:n+i].
    for o, n, i in matches:
        if len(matches) == 1:  # A rule doesn't have a partner

            if o > n:          # Old rule was deleted
                print('removed: ' + old_doc)
            elif o < n:        # New rule was added
                print('added: ' + new_doc)
        else:
            print(o, n, i, old_doc)
