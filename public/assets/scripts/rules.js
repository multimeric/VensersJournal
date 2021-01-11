function findRules() {

  // Hardcoding this for the time being, yes this is hacky trash
  // but so is all of this lmao
  if (document.getElementById('newHeader').innerHTML == 'Commander Legends') {
    return;
  }

  $('td:odd, p').each(function() {
    if($(this).html().match(/\d{1,3}\.\d{1,3}\w?/)) {
       let link = $(this).html().replace(/\d{1,3}\.\d{1,3}\w?/g, function(match) {
         return `<a href="/${match}">${match}</a>`;
       });
       $(this).html(link);
    }
    if($(this).html().match(/\d{3}[\.,\)][^\dj]/)) {
      let link = $(this).html().replace(/\d{3}[\.,\)][^\dj]/g, function(match) {
        return `<a href="/${match.slice(0,3)}">${match.slice(0,3)}</a>${match.slice(3)}`;
      });
      $(this).html(link);
    }
  });
}


// TODO: this shouldn't be a separate function but something broke so
function hyperlinkedRules() {
  $('p').each(function() {
    if($(this).html().match(/\d{1,3}\.\d{1,3}\w?/)) {
       let link = $(this).html().replace(/\d{1,3}\.\d{1,3}\w?/g, function(match) {
         return `<a href="/${match}">${match}</a>`;
       });
       $(this).html(link);
    }
    if($(this).html().match(/\d{3}[\.,\)][^\dj]/)) {
      let link = $(this).html().replace(/\d{3}[\.,\)][^\dj]/g, function(match) {
        return `<a href="/${match.slice(0,3)}">${match.slice(0,3)}</a>${match.slice(3)}`;
      });
      $(this).html(link);
    }
  });
}
