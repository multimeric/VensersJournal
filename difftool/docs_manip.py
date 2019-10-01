import difflib
import re

import sort_utils


def extract_rules(input_file):
    """Get rules out of an input Comprehensive Rules doc.

    At the moment this does intentionally leave some things off,
    most notably rule '808.' This is not a feature, it's a hack.

    Keyword arguments:
    input_file -- the CR file you want to strip rules from
    """
    with open(input_file, 'r') as rules_doc:
        entire_doc = rules_doc.read()
        # Handle editorial snafus on WotC's end
        entire_doc = entire_doc.replace(" \"", " “")
        entire_doc = entire_doc.replace("(\"", "(“")
        entire_doc = entire_doc.replace("\"", "”")
        entire_doc = entire_doc.replace("'", "’")
        entire_doc = entire_doc.replace(" ’", " ‘")
        entire_doc = entire_doc.replace("-", "—")
        entire_doc = re.sub(r"(\w)—(\w)", r"\1–\2", entire_doc)
        entire_doc = entire_doc.replace("(tm)", "™")
        entire_doc = entire_doc.replace("(r)", "®")
        entire_doc = re.sub(r"\n\s{4,}(\w)", r" \1", entire_doc)

        extracted_rules = re.findall('^\d{3}[^a-zA-Z\n]{2}.*[“"”.) :]$',
                                     entire_doc, re.MULTILINE)
    rules_list = []

    for rule in extracted_rules[1:]:
        rules_list.append(rule.split())

    return rules_list


def aggregate_rule_nums(first_rules, second_rules):
    """Aggregate rule numbers.

    Aggregates the rules numbers (NOT the rules themselves)
    so we can ensure two things:
    1. Each list has the same number of elements, so it's
       easier to fiddle with later
    2. It allows placeholders for e.g. if there's a new rule
       with no relevant partner in the old rules

    Keyword arguments:
    first_rules -- the older list of rules
    second_rules -- the newer list of rules
    """
    first_rule_numbers = [i[0] for i in first_rules]
    second_rule_numbers = [i[0] for i in second_rules]

    unique_rules = set(first_rule_numbers) ^ set(second_rule_numbers)

    for index in unique_rules:
        placeholder = [index, '']

        if index not in first_rule_numbers:
            first_rules.append(placeholder)

        if index not in second_rule_numbers:
            second_rules.append(placeholder)

    sort_utils.insertion_sort(first_rules)
    sort_utils.insertion_sort(second_rules)

    completerules_list = [word for word in first_rules]
    return completerules_list
