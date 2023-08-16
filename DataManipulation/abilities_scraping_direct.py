""" 
This file donwloads directly all moves from the Smogon webpage. 
It does not use any webscraping framework.
"""

import requests
import json
import re
import logging
import time
from dataclasses import dataclass

url = 'https://www.smogon.com/dex/xy/abilities/'
save_url = './dexes/abilities_direct.json'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@dataclass
class Ability:
    name: str
    description: str


def extract():
    logger.info('Extracting abilities...')
    start_time = time.time()

    response = requests.get(url)

    # Extract the JSON string from the response text using regex
    data = "".join(re.findall(r'dexSettings = (\{.*\})', response.text))

    # Parse the JSON string to a dictionary
    data = json.loads(data)

    # Extract the list of abilities from the dictionary
    abilities = data.get('injectRpcs', [])[1][1].get('abilities', [])

    # Create a list of Ability objects from the list of abilities
    ab_results = []
    for ability in abilities:
        name = ability.get('name', '')
        description = ability.get('description', '')

        ability_obj = Ability(name, description)
        if(ability_obj.name != 'Moutaineer' and ability_obj.name != 'Persistent' and ability_obj.name != 'Rebound'):
            ab_results.append(ability_obj)

    # Sort the list of Move objects by name and convert it to a dictionary
    sorted_results = sorted(ab_results, key=lambda a: a.name)
    results_dict = {ab.name: ab.__dict__ for ab in sorted_results}

    elapsed_time = time.time() - start_time
    logger.info(f'Extracted {len(ab_results)} moves in {elapsed_time:.2f} seconds.')
    return results_dict


def save_abilities(results_dict):
    logger.info('Saving abilities...')
    start_time = time.time()

    with open(save_url, 'w', encoding="UTF-8") as fp:
        json.dump(results_dict, fp, indent=4, ensure_ascii=False)

    elapsed_time = time.time() - start_time
    logger.info(f'Saved {len(results_dict)} abilities to {save_url} in {elapsed_time:.2f} seconds.')


def main():
    results_dict = extract()
    save_abilities(results_dict)


if __name__ == '__main__':
    main()