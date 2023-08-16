""" 
This file donwloads directly all items from the Smogon webpage. 
It does not use any webscraping framework.
"""

import requests
import json
import re
import logging
import time
from dataclasses import dataclass

url = 'https://www.smogon.com/dex/xy/items/'
save_url = './dexes/items_direct.json'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@dataclass
class Item:
    name: str
    description: str


def extract():
    logger.info('Extracting items...')
    start_time = time.time()

    response = requests.get(url)

    # Extract the JSON string from the response text using regex
    data = "".join(re.findall(r'dexSettings = (\{.*\})', response.text))

    # Parse the JSON string to a dictionary
    data = json.loads(data)

    # Extract the list of items from the dictionary
    items = data.get('injectRpcs', [])[1][1].get('items', [])

    # Create a list of Item objects from the list of items
    ab_results = []
    for item in items:
        name = item.get('name', '')
        description = item.get('description', '')

        item_obj = Item(name, description)
        if(item_obj.name != 'Crucibellite'):
            ab_results.append(item_obj)

    # Sort the list of Move objects by name and convert it to a dictionary
    sorted_results = sorted(ab_results, key=lambda i: i.name)
    results_dict = {i.name: i.__dict__ for i in sorted_results}

    elapsed_time = time.time() - start_time
    logger.info(f'Extracted {len(ab_results)} moves in {elapsed_time:.2f} seconds.')
    return results_dict


def save_abilities(results_dict):
    logger.info('Saving items...')
    start_time = time.time()

    with open(save_url, 'w', encoding="UTF-8") as fp:
        json.dump(results_dict, fp, indent=4, ensure_ascii=False)

    elapsed_time = time.time() - start_time
    logger.info(f'Saved {len(results_dict)} items to {save_url} in {elapsed_time:.2f} seconds.')


def main():
    results_dict = extract()
    save_abilities(results_dict)


if __name__ == '__main__':
    main()