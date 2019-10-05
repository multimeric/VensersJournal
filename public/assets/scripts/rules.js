function findRules() {
  $('td:odd').each(function() {
    let link;
    if($(this).html().match(/\d{1,3}\.\w{1,4}/)) {
       link = $(this).html().replace(/\d{1,3}\.\w{1,4}/g, function(match) {
         return `<a href="/${match}">${match}</a>`;
       });
       $(this).html(link);
    }
  });
}
