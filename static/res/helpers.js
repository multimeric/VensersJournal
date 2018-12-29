'use strict';

var dateFormat = require('dateformat');
var sets = require('./sets')

module.exports = {
  parseDocFiles: function(fileList) {
    var docsArr = [];

    for (var each of fileList.reverse()) {
      var date = dateFormat(each.slice(4,-4), 'dd mmm, yyyy');
      docsArr.push({filepath: each, date: date});
    }

    return docsArr;
  },

  parseCRFiles: function(fileList) {
    var crArr = [];
    var setDict = sets.getSetDict();

    for (var each of fileList.reverse()) {
      var date = dateFormat(each.slice(3,-8), 'dd mmm, yyyy');
      crArr.push({filepath: each, setName: setDict[each.slice(-7,-4)]});
    }

    return crArr;
  }
}