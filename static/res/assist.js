'use strict'

var sets = require('./sets')

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

module.exports = {
  getRules: function(JSONfile) {
    
    var usableJSON = JSON.parse(JSONfile);
    var usableNames = usableJSON[0].names;
    
    var taggedJSON = replaceTags(usableJSON);
    
    return taggedJSON
  }
}
