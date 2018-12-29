#!/bin/bash
wget -O "$2" "$1";
rsubl "$2"
read -p "Waiting for the file to be saved..."
python3 difftool/diff_rules.py "$4" "$5" "$2" "$3";
