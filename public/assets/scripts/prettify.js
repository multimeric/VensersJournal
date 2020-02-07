function makeItPretty() {
  findCards();
}

function findCards() {
  $('p, li').each(function() {
    if($(this).html().match(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/)) {
                              // I am going to assume that anybody who plays this game knows what lands do.
      let problem_children = ["Plains", "Island", "Swamp", "Mountain", "Forest",
                              "Snow-Covered Plains", "Snow-Covered Island", "Snow-Covered Swamp", "Snow-Covered Mountain", "Snow-Covered Forest",
                              "Warning", "Example", "Exile",
                              "Goblin Wizard"]
      let link = $(this).html().replace(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/g, function(match) {
        if (problem_children.includes(match)) {
          return match;
        }
        // Singular Elf in the IPG for clarity's sake. Grumble.
        if (match === 'Llanowar Elf') {
          return `<auto-card name="Llanowar Elves"">${match}</auto-card>`;
        }
        return `<auto-card>${match}</auto-card>`;
      });
      $(this).html(link);
    }
  });
}
