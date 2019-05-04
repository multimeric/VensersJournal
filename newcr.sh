#!/bin/bash
# Arg list: Wizards media, new_path, full_new_setname, full_old_setname

# the current string to the path on WotC media servers. Might change.
wotc_prefix="http://media.wizards.com/2019/downloads/MagicCompRules "
# path to rules folder
rules_path="static/rules/"
# path to diffs folder
diffs="public/assets/cr-diffs"

# Get the path for the previous CR
old_path=$rules_path$(ls $rules_path | tail -1)
# And also get the old diff
old_diff=$(ls -t $diffs | head -n1 | cut -d '.' -f 1)

# snag the new CR
wget -O "$rules_path$2" "$wotc_prefix$1" ;

# convert the temp file to UTF-8 so we can actually use it
# UPDATE WITH WAR: This seeeeems to be served directly as UTF-8 now!!
# iconv -f 850 -t UTF-8 -o "$rules_path$2" temp;
# Dump the temp file
#rm temp
# Diff 'em away boys
python3 difftool/diff_rules.py $old_path "$4" "$rules_path$2" "$3";

# ... now get the new diff
new_diff=$(ls -t $diffs | head -n1 | cut -d '.' -f 1)

sed -i -s "s/$old_diff/$new_diff/" views/partials/header.ejs