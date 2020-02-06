function makeItPretty() {
  findCards();
}

function findCards() {
  $('p, li').each(function() {
    if($(this).html().match(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/)) {
      let problem_children = ["Plains", "Island", "Swamp", "Mountain", "Forest",
                              "Snow-Covered Plains", "Snow-Covered Island", "Snow-Covered Swamp", "Snow-Covered Mountain", "Snow-Covered Forest"]
      let link = $(this).html().replace(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/g, function(match) {
        if (problem_children.includes(match)) {
          return match;
        }
        return `<auto-card>${match}</auto-card>`;
      });
      $(this).html(link);
    }
  });
}
