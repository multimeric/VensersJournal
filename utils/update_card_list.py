import glob
import os
import requests
import re

from datetime import datetime


start = datetime.now()
RULES_FILES = glob.glob('/home/vill/VensersJournal/static/rules/*.txt')
LATEST_CR = max(RULES_FILES, key=os.path.getctime)
CARD_URL = "https://api.scryfall.com//cards/named?exact="

card_image_dict = {}

with open(LATEST_CR, 'r') as file:
    rules_doc = file.read()
    rules_doc = re.sub("’", "'",  rules_doc)

    # Get all the Examples out of the CR first
    examples = re.findall('^Example:.*', rules_doc, re.MULTILINE)

    # then extract card names from THAT
    matched_card_names = re.findall('[A-Z][a-z]{2,}'
                                    '(?:(?:[ ,\'\-](?:s| )? ?| \w{2,3}?'
                                    '(?:\s\w{2,3})? ?)[A-Z][a-z]*)*',
                                    ''.join(examples), re.MULTILINE)

    touched_names = {}

    # Let's axe the things that are super not relevant
    trash = ['Copy',  # copy tokens are never referenced
             'Horror',  # same for horror tokens
             'Example']  # obviously.
    matched_card_names[:] = [x for x in matched_card_names if x not in trash]

    # I hate this, so if someone has a better solution, lemme know
    back_faces = ['Saproling',
                  'Insectile Aberration',
                  'Wildblood Pack',
                  'Ironfang',
                  'Homicidal Brute',
                  'Ravager of the Fells']

    for card in matched_card_names:
        if card in touched_names:
            continue
        res = requests.get(url=CARD_URL + card)
        if res.status_code == 404:
            continue
        if res.status_code == 200:
            try:
                card_image_dict[card] = res.json()['image_uris']['normal']
            except KeyError:
                face = 1 if card in back_faces else 0
                dfc_image = res.json()['card_faces'][face]['image_uris']['normal']
                card_image_dict[card] = dfc_image
        touched_names.add(card)

cardlist_location = '/home/vill/VensersJournal/static/res/cardlist.js'
with open(cardlist_location, 'w', encoding='utf-8') as out_cardlist:
    out_cardlist.write('''module.exports = {
                            getCardList: function() {
                            return cardList;
                            }
                        }\n''')
    out_cardlist.write('var cardList = {\n')
    for card in card_image_dict:
        out_cardlist.write(
            '"' + card + '": "' + card_image_dict[card] + '",\n')
    out_cardlist.write('}\n')
print(datetime.now() - start)
