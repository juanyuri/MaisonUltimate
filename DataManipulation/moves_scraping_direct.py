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

url = 'https://www.smogon.com/dex/xy/moves/'
save_url = './dexes/movedex_direct.json'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class Move:
    name: str
    move_type: str
    category: str
    bp: int
    pp: int
    accuracy: int
    priority: int
    description: str


def extract_moves():
    logger.info('Extracting moves...')
    start_time = time.time()

    response = requests.get(url)

    # Extract the JSON string from the response text using regex
    data = "".join(re.findall(r'dexSettings = (\{.*\})', response.text))

    # Parse the JSON string to a dictionary
    data = json.loads(data)

    # Extract the list of moves from the dictionary
    moves = data.get('injectRpcs', [])[1][1].get('moves', [])

    # Create a list of Move objects from the list of moves
    move_results = []
    for move in moves:
        name = move.get('name', '')
        move_type = move.get('type', '')
        category = move.get('category', '')
        accuracy = move.get('accuracy', '')
        priority = move.get('priority', '')
        bp = move.get('power', '')
        pp = move.get('pp', '')
        description = move.get('description', '')

        move_obj = Move(name, move_type, category, int(bp), int(pp), int(accuracy), int(priority), description)
        if(move_obj.name != 'Paleo Wave' and move_obj.name != 'Shadow Strike'):
            move_results.append(move_obj)

    # Sort the list of Move objects by name and convert it to a dictionary
    sorted_results = sorted(move_results, key=lambda x: x.name)
    results_dict = {move.name: move.__dict__ for move in sorted_results}

    elapsed_time = time.time() - start_time
    logger.info(f'Extracted {len(move_results)} moves in {elapsed_time:.2f} seconds.')
    return results_dict


def save_moves(results_dict):
    logger.info('Saving moves...')
    start_time = time.time()

    with open(save_url, 'w', encoding="UTF-8") as fp:
        json.dump(results_dict, fp, indent=4, ensure_ascii=False)

    elapsed_time = time.time() - start_time
    logger.info(f'Saved {len(results_dict)} moves to {save_url} in {elapsed_time:.2f} seconds.')


def main():
    results_dict = extract_moves()
    save_moves(results_dict)


if __name__ == '__main__':
    main()