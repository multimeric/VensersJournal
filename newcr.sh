#!/bin/bash
# Arg list: output file (cr-YYYY-MM-DD-SET.txt), rules file (WotC media)

# path to rules folder
rules_path="static/rules/"
# path to diffs folder
diffs="public/assets/cr-diffs"
#set codes
sets_file="static/res/sets.js"

# snag the new CR
wget -O "$rules_path$2" "$1"

old_rules_file=$(ls $rules_path -t | head -2 | tail -1)
old_set_abbr=$(echo $old_rules_file | cut -d"-" -f5 | cut -d"." -f1)
old_set_name=$(grep -oP "\"$old_set_abbr\": \"\K[^\"]+" $sets_file)

new_rules_file=$(ls $rules_path -t | head -1)
new_set_abbr=$(echo $new_rules_file | cut -d"-" -f5 | cut -d"." -f1)
new_set_name=$(grep -oP "\"$new_set_abbr\": \"\K[^\"]+" $sets_file)

echo $old_rules_file, $old_set_abbr, $old_set_name
echo $new_rules_file, $new_set_abbr, $new_set_name

# Diff 'em away boys
python3 difftool/diff_rules.py "$rules_path$old_rules_file" "$old_set_name" "$rules_path$new_rules_file" "$new_set_name"
python3 /home/vill/Southfall/grab_rules.py "$rules_path$2"