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
        req = requests.get(url=CARD_URL + card)
        if req.status_code == 404:
            continue
        if req.status_code == 200:
            try:
                card_image_dict[card] = req.json()['image_uris']['normal']
            except KeyError:
                face = 1 if card in back_faces else 0
                dfc_image = req.json()['card_faces'][face]['image_uris']['normal']
                card_image_dict[card] = dfc_image
        touched_names[card] = '1'

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
# req = requests.get(url=FULL_URL)
# mtg_json_dump = req.json()

# card_image_dict = {}
# for name in mtg_json_dump['data']:
#     this_url = CARD_URL + name
#     req = requests.get(url=CARD_URL + name)
#     try:
#         card_image_dict[name] = req.json()['image_uris']['normal']
#     except KeyError:
#         dfc_image = req.json()['card_faces'][0]['image_uris']['normal']
#         card_image_dict[name] = dfc_image
#     except:
#         print(name + " threw an unexpected error")
#         continue

# cardlist_location = '/home/vill/VensersJournal/static/res/cardlist.js'
# with open(cardlist_location, 'w', encoding='utf-8') as out_cardlist:
#     out_cardlist.write('''module.exports = {
#                             getCardList: function() {
#                             return cardList;
#                             }
#                         }\n''')
#     out_cardlist.write('var cardList = {\n')
#     for card in card_image_dict:
#         out_cardlist.write(
#             '"' + card + '": "' + card_image_dict[card] + '",\n')
#     out_cardlist.write('}\n')
