function XHR(file, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', file, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-16');
    xhr.send();
}

/**
 * Generates the table of rules diffs.
 *
 * - The first object in the JSON will *always* be our header, so we can
 * take that and handle it immediately.
 * - Then slice [1:end] of the rest of the JSON, iterate over it, and
 * spit out the proper rules
 */
function getDiffedRules() {
    XHR('public/assets/rules/M19-GRN.json', function(response) {
        console.log(window.location.href)
        usableJSON = $.parseJSON(response);

        headerObj = usableJSON[0];
        getHeaders(headerObj);
        
        rules = replaceTags(usableJSON.slice(1));
        
        for (var curRule of rules) {
            oldRule = curRule.old;
            newRule = curRule.new;

            $('table').append('<tr>');

            if (!curRule['old']) {
                insertEmptyCell();

                $('tr:last-of-type').append(
                    $('<td class="add"/>').html(prettifyRule(newRule)));

            } else if (!curRule['new']) {

                $('tr:last-of-type').append(
                    $('<td class="remove"/>').html(prettifyRule(oldRule)));

                insertEmptyCell();
            } else {

                $('tr:last-of-type').append(
                    $('<td/>').html(prettifyRule(oldRule)));

                $('tr:last-of-type').append(
                    $('<td/>').html(prettifyRule(newRule)));

            }
            $('table').append('</tr>');
        }
    });
}


/** Generates an empty cell to 'placehold' for otherwise only-child rules */
function insertEmptyCell() {
    $('tr:last-of-type').append($('<td/>'));
}


/** Creates a properly formatted number/text pairing for display 
 *
 * @param {Object} rule - The rule to format 
 */
function prettifyRule(rule) {
            return '<b>' + rule.ruleNum + '</b><br>' + rule.ruleText;
}


/**
 * Sends readable headers to their respective DOM elements. 
 *
 * Here, 'old' will be the version of the Comprehensive Rules we're
 * diffing FROM, while 'new' is the version we're diffing TO.
 *
 * @param someJSON - the parsed JSON to generate the header from
 */
function getHeaders(someJSON) {
    $('#oldHeader').html(someJSON.old);
    $('#newHeader').html(someJSON.new);
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
        /old_end|new_end/g, '</span>');

    return $.parseJSON(stringifiedJSON);
}
