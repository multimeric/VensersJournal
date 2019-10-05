import requests


FULL_URL = "https://api.scryfall.com/catalog/card-names"
CARD_URL = "https://api.scryfall.com//cards/named?exact="

req = requests.get(url=FULL_URL)
mtg_json_dump = req.json()

card_image_dict = {}
for name in mtg_json_dump['data']:
    this_url = CARD_URL + name
    req = requests.get(url=CARD_URL + name)
    try:
        card_image_dict[name] = req.json()['image_uris']['normal']
    except KeyError:
        if name == "Look at Me, I'm R&D":
            continue
        if name == "R&D's Secret Lair":
            continue
        if name == "Sword of Dungeons & Dragons":
            continue
        if name == "_____":
            continue
        dfc_image = req.json()['card_faces'][0]['image_uris']['normal']
        card_image_dict[name] = dfc_image
    except:
        print(name + "threw an unexpected error")
        continue

cardlist_location = '/home/vill/VensersJournal/static/res/cardlist.js'
with open(cardlist_location, 'w', encoding='utf-8') as out_cardlist:
    out_cardlist.write('''module.exports = {
                            getCardList: function() {
                            return cardList;
                            }
                        }\n''')
    out_cardlist.write('var cardList = {\n')
    for card in card_image_dict:
        out_cardlist.write('"' + card + '": "' + card_image_dict[card] + '",\n')
    out_cardlist.write('}\n')
