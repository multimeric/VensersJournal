'use strict';

var dateFormat = require('dateformat');
var sets = require('./sets');
const fs = require('fs');

module.exports = {
  getRules: function(JSONfile) {

    var usableJSON = JSON.parse(JSONfile);
    var taggedJSON = replaceTags(usableJSON);

    return taggedJSON
  },

  parseDocFiles: function(fileList) {
    var docsArr = [];

    /* Okay, buckle up, because this is some weird esoteric Javascript thing.
     * If you try to get a Date object from a date that looks ISO-compliant
     * (e.g. 2018-01-21), the Date object assumes that and will use UTC timezone.
     * This means, for me, being in UTC -6:00, that all of my dates were a day off
     * from what I expected them to be.
     * If you pass in something less directly ISO-like, the Date formatter
     * looses up its parser a bit and will use your actual timezone. So that's why
     * I added the space there.
     * Yes, I realize this comment is twice the length of the thing I'm commenting.
     */
    for (var currentFile of fileList.reverse()) {
      var date;
      /* Stupid sexy special case because we got an IPG revision almost *immediately*
       * after it came out.
       */
      if (currentFile == 'ipg-2017-09-29a.pdf') {
        date = dateFormat(currentFile.slice(4,-5) + " ", 'dd mmm, yyyy');
        docsArr.push({filepath: currentFile, date: date + ' (rev a)'});
      }
      else {
        var date = dateFormat(currentFile.slice(4,-4) + " ", 'dd mmm, yyyy');  
        docsArr.push({filepath: currentFile, date: date});
      } 
    }

    return docsArr;
  },

  parseCRFiles: function(fileList) {
    var crArr = [];
    var setDict = sets.getSetDict();

    for (var each of fileList.reverse()) {
      crArr.push({filepath: each, setName: setDict[each.slice(-7,-4)]});
    }

    return crArr;
  },

  constructRulesTrace: function(ruleNum, dir, callback) {
    let trace = [];
    fs.readdir(dir, function(err, files) {
      let sorted = [];
      let diffDict = {};

      // Find the most recent diff file
      files.forEach(function(file) {
        var stats = fs.statSync(dir + "/" + file);
        if (stats.isFile()) {
            sorted.push({"file": file, "mtime": stats.mtime});
            // build a dict for dict[new] = old
            diffDict[file.substring(4,7)] = file.substring(0,3);
        }
      });

      sorted.sort(function(a,b) {
        return b.mtime - a.mtime;
      });
      
      for (let i = 0; i < sorted.length - 1; i++) {
        let val = diffDict[sorted[i].file.substring(4,7)];
        for (let j = i + 1; j < sorted.length; j++) {
          if (sorted[j].file.substring(4,7) == val) {
            let tmp = sorted[i + 1];
            sorted[i + 1] = sorted[j];
            sorted[j] = tmp;
          }
        }
      }
      
      let startingDiff = JSON.parse(fs.readFileSync(dir + "/" + sorted[0].file));
      console.log(`Starting diff is ${sorted[0].file}`);
      let startingRule = findRule(ruleNum, startingDiff);
      let currentRule = null;
      
      if (startingRule) {
        console.log(`Found rule in ${sorted[0].file}`);
        trace.push({ "newCr": startingDiff[0]["names"]["new_full"],
                     "oldCr": startingDIff[0]["names"]["old_full"],
                     "rule": startingRule });

        // If there's no old rule to look at, this is guaranteed to be
        // a brand new rule, so we're done.
        if (!startingRule["old"]) {
          return callback(trace);
        } else {
          currentRule = startingRule["old"]["ruleNum"];
        }
      }

      for (let each of sorted.slice(1, sorted.length)) {
        let diff = JSON.parse(fs.readFileSync(dir + "/" + each.file));
        console.log(`Looking at diff ${each.file} for rule ${ruleNum}`);
        let rule = findRule(ruleNum, diff);
        if (rule) {
          trace.push({ "newCr": diff[0]["names"]["new_full"],
                       "oldCr": diff[0]["names"]["old_full"],
                       "rule": rule });
          console.log("Pushed rule");
          if (rule["old"] == null) {
            console.log(`Sending ${trace.length} rules to trace.ejs`);
            return callback(trace);
          }
          currentRule = rule["old"]["ruleNum"];
        }
      }
      console.log(`Sending ${trace.length} rules to trace.ejs`);
      return callback(trace);
    });
  }
}

function findRule(ruleNum, rootDiff) {
  for (let i = 0; i < rootDiff.length; i++){
    if (rootDiff[i]["new"] && rootDiff[i]["new"]["ruleNum"] == ruleNum) {      
      return rootDiff[i];
    }
  }
}


/**
 * Replaces the 'dummy' values in the JSON with proper
 * HTML tags for display.
 *
 * @param someJSON - the parsed JSON to modify
 */
function replaceTags(someJSON) {
    var stringifiedJSON = JSON.stringify(someJSON);

    stringifiedJSON = stringifiedJSON.replace(
        /old_start/g, '<span class=\'old\'>');

    stringifiedJSON = stringifiedJSON.replace(
        /new_start/g, '<span class=\'new\'>');

    stringifiedJSON = stringifiedJSON.replace(
        / old_end| new_end/g, '</span> ');

    return JSON.parse(stringifiedJSON);
} 