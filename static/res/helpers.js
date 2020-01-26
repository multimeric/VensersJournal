'use strict';

var dateFormat = require('dateformat');
var sets = require('./sets')

module.exports = {
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
  }
}