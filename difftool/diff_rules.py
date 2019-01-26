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

rules = [{ 'names' : {
                'old_full': sys.argv[2],
                'old_setcode': orig_cr_set_code,
                'new_full': sys.argv[4],
                'new_setcode': dest_cr_set_code
            }
        }]

out_path = 'public/assets/cr-diffs/'
output_rules_file = '%s%s-%s.json' % (out_path, orig_cr_set_code, dest_cr_set_code)

with open(output_rules_file, 'w', encoding='utf-8') as out_json:
    for i, (old, new) in enumerate(zip(old_rules, new_rules)):
        output_comparison = diff_utils.diff_rules(old, new)
        if output_comparison:
            rules.append(output_comparison)
    out_json.write(json.dumps(rules, indent=4))
