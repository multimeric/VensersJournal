function findRules() {
  $('td:odd, p').each(function() {
    if($(this).html().match(/\d{1,3}\.\w{1,4}/)) {
       let link = $(this).html().replace(/\d{1,3}\.\w{1,4}/g, function(match) {
         return `<a href="/${match}">${match}</a>`;
       });
       $(this).html(link);
    }
    if($(this).html().match(/\d{3}.[^\d]/)) {
      let link = $(this).html().replace(/\d{3}.[^\d]/g, function(match) {
        return `<a href="/${match.slice(0,3)}">${match.slice(0,3)}</a>${match.slice(3)}`;
      });
      $(this).html(link);
    }
  });
}
