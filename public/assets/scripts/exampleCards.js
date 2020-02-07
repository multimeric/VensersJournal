var cardList = require('/home/vill/VensersJournal/static/res/cardlist').getCardList();

getCardsFromExample = function(str) {
  if (str === null) return "";

  var cardname_regex = new RegExp(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/g);
  var cardnames = [];
  var alreadyMatched = new Set();
  var outputCardList = [];
  var flippedCards = ['Stabwhisker the Odious', 'Tomoya the Revealer', 'Tok-Tok, Volcano Born'];
  var planesCards = ['Jund'];
  var adventures = new BidirectionalAdventureMap({ "Giant Killer" : "Chop Down" });

  while ((cardnames = cardname_regex.exec(str)) !== null) {
    card = cardnames[0];
    if (cardList[card]) {
      if (card == 'Exile') continue;

      if (!alreadyMatched.has(card)) {
        status = flippedCards.includes(card) ? 'flipped' : 'regular';
        status = planesCards.includes(card) ? 'plane' : status;
        outputCardList.push(new CardObject(cardList[card], status));
        alreadyMatched.add(card);
        if(adventures.get(card) || adventures.revGet(card)) {
          alreadyMatched.add(adventures.get(card));
          alreadyMatched.add(adventures.revGet(card));
        }
      }
    }
  }
  return outputCardList
}

class CardObject {
  constructor(uri, status) {
    this.imageUri = uri;
    this.status = status;
  }
}

function BidirectionalAdventureMap(map) {
  this.map = map;
  this.reverseMap = {};
  for (var k in map) {
    var v = map[k];
    this.reverseMap[v] = k;
  }
}

BidirectionalAdventureMap.prototype.get = function(k){ return this.map[k]; };
BidirectionalAdventureMap.prototype.revGet = function(k){ return this.reverseMap[k]; };

module.exports = { getCardsFromExample }
