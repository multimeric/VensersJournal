function findRules() {
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
