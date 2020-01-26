import datetime
import json
import sys

import diff_utils
import rules_manip


# Arg list looks like this:
# old CR file, old file set name (e.g. "Guilds of Ravnica"),
# new CR file, new file set name
orig_cr, dest_cr = sys.argv[1], sys.argv[3]

old_rules = rules_manip.extract_rules(orig_cr)
new_rules = rules_manip.extract_rules(dest_cr)

rules_manip.aggregate_rule_nums(old_rules, new_rules)
rules_manip.align_matches(old_rules, new_rules)

# This is explicitly done because I have complete control over the file
# naming convention I use. This is N O T the best way to do this, but
# I didn't want to futz with regex here.
orig_cr_set_code = orig_cr[-7:-4]
dest_cr_set_code = dest_cr[-7:-4]

rules = [{'names': {'old_full': sys.argv[2],
                    'old_setcode': orig_cr_set_code,
                    'new_full': sys.argv[4],
                    'new_setcode': dest_cr_set_code}}]
changes = []
deletions = []
out_path = 'public/assets/cr-diffs/'
output_rules_file = '%s%s-%s.json' % (out_path,
                                      orig_cr_set_code,
                                      dest_cr_set_code)

# output_rules_file = 'test.json'

output_numbering_changes = '/home/vill/Southfall/changes.json'

with open(output_rules_file, 'w', encoding='utf-8') as out_json, \
        open(output_numbering_changes, 'w', encoding='utf-8') as out_changes:
    for i, (old, new) in enumerate(zip(old_rules, new_rules)):
        output_comparison = diff_utils.diff_rules(old, new)
        if output_comparison:
            rules.append(output_comparison)
            if output_comparison['old'] and output_comparison['new']:
                if (output_comparison['old']['ruleNum'] !=
                        output_comparison['new']['ruleNum']):
                    changes.append({'old':
                                    output_comparison['old']['ruleNum'],
                                    'new':
                                    output_comparison['new']['ruleNum']})

            if output_comparison['old'] and not output_comparison['new']:
                deletions.append({'removed':
                                  output_comparison['old']['ruleNum']})

    out_json.write(json.dumps(rules, indent=4))
    finished_changes = {'lastUpdate':
                        datetime.datetime.today().strftime('%Y-%d-%m'),
                        'changes': changes,
                        'deletions': deletions}
    out_changes.write(json.dumps(finished_changes, indent=4))
