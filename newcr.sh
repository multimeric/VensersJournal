#!/bin/bash
# Arg list: output file (cr-YYYY-MM-DD-SET.txt), rules file (WotC media)

# path to rules folder
rules_path="static/rules/"
# path to diffs folder
diffs="public/assets/cr-diffs"
#set codes
sets_file="static/res/sets.js"

# build the date from the filename
year=${1:(${#1}-12):4}
month=${1:(${#1}-8):2}
day=${1:(${#1}-6):2}
abbr=$(cat $sets_file | tail -n2 | grep -oP "[A-Z0-9]{3}")
new_rules_file=$rules_path$year-$month-$day-$abbr.txt

# snag the new CR
wget -O "$new_rules_file" "$1"

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
python3 /home/vill/Southfall/grab_rules.py "$new_rules_file"