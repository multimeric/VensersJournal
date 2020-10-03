var cardList = require('/home/vill/VensersJournal/static/utils/cardlist').getCardList();
var ignorableCards = require('/home/vill/VensersJournal/static/utils/cardlist').getIgnorableCards();

getCardsFromExample = function(str) {
  if (str === null) return "";

  var cardname_regex = new RegExp(/[A-Z][a-z]{2,}(?:(?:[ ,'\-](?:s| )? ?| \w{2,3}?(?:\s\w{2,3})? ?)[A-Z][a-z]*)*/g);
  var cardnames = [];
  var alreadyMatched = new Set();
  var outputCardList = [];
  var flippedCards = ['Stabwhisker the Odious', 'Tomoya the Revealer', 'Tok-Tok, Volcano Born'];
  var sidewaysCards = ['Jund', 'Assault', 'Fire'];
  var multiple = new BidirectionalMap({"Giant Killer" : "Chop Down",
                                       "Assault" : "Battery",
                                       "Fire" : "Ice"});

  while ((cardnames = cardname_regex.exec(str)) !== null) {
    card = cardnames[0];
    if (cardList[card]) {
      if (ignorableCards.includes(card)) continue;
      console.log(card);
      if (!alreadyMatched.has(card)) {
        status = flippedCards.includes(card) ? 'flipped' : 'regular';
        status = sidewaysCards.includes(card) ? 'sideways' : status;
        outputCardList.push(new CardObject(cardList[card], status));
        alreadyMatched.add(card);

        if(multiple.get(card) || multiple.revGet(card)) {
          alreadyMatched.add(multiple.get(card));
          alreadyMatched.add(multiple.revGet(card));
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

function BidirectionalMap(map) {
  this.map = map;
  this.reverseMap = {};
  for (var k in map) {
    var v = map[k];
    this.reverseMap[v] = k;
  }
}

BidirectionalMap.prototype.get = function(k){ return this.map[k]; };
BidirectionalMap.prototype.revGet = function(k){ return this.reverseMap[k]; };

module.exports = { getCardsFromExample }
