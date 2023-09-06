import asyncio
from playwright.sync_api import sync_playwright

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from dataclasses import dataclass  # Interfaces
import logging
import time
import json

url = 'https://www.smogon.com/dex/xy/moves/'
save_url = './dexes/movedex.json'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@dataclass
class Move(slots=True):
    name: str
    move_type: str
    category: str
    bp: int
    pp: int
    accuracy: int
    priority: int
    description: str


def extract(html, selector, option):
    element = html.css_first(selector)  # CSS selectors are kings
    if element is not None:
        if option == 'text':
            return element.text(strip=True)
        elif option == 'attrs':
            return element.attributes
        else:
            return element


def save(results):
    with open(save_url, 'w', encoding="UTF-8") as fp:
        json.dump(results, fp, indent=4, ensure_ascii=False)


def scroll_me():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto('https://www.smogon.com/dex/xy/moves/')
        page.click("button.css-1litn2c")  # closing cookies

        time.sleep(2)
        results_dict = {}
        end_loop = False
        initial = 150

        start_time = time.time()

        while True:
            if end_loop:
                break

            page.mouse.wheel(0, initial)
            initial += 25
            logger.info("Scrolling...")

            elems = page.locator('.DexTable .MoveRow').all()[:-1]

            for elem in elems:
                name_loc = elem.locator('.MoveRow-name .MoveLink')
                move_name = name_loc.inner_text()
                logger.info(f"Extracting move: {move_name}")

                type_loc = elem.locator('.MoveRow-type .Type')
                move_type = type_loc.inner_text()

                category_loc = elem.locator('.MoveRow-damage div')
                move_category = category_loc.get_attribute('class').split()[1]

                bp_loc = elem.locator('.MoveRow-power span')
                move_bp = bp_loc.inner_text()

                accuracy_loc = elem.locator('.MoveRow-accuracy span')
                move_accuracy = accuracy_loc.inner_text().replace('%', '')

                pp_loc = elem.locator('.MoveRow-pp span')
                move_pp = pp_loc.inner_text()

                desc_loc = elem.locator('.MoveRow-description')
                move_desc = desc_loc.inner_text()

                if move_accuracy == '—':
                    move_accuracy = 0

                if move_bp == '—':
                    move_bp = 0

                if move_pp == '—':
                    move_pp = 0

                move = Move(move_name, move_type, move_category, int(move_bp),
                            int(move_pp), int(move_accuracy), 0, move_desc)

                if move_name in results_dict:
                    logger.warning(f"Duplicate move name: {move_name}")
                else:
                    results_dict[move_name] = move.__dict__

                if move_name == 'Zen Headbutt':
                    end_loop = True
                    break

        elapsed_time = time.time() - start_time

        logger.info(f"Extracted {len(results_dict)} moves in {elapsed_time:.2f} seconds.")
        save(results_dict)
        logger.info(f"Saved {len(results_dict)} moves to {save_url}.")
        browser.close()


def main():
    scroll_me()


if __name__ == '__main__':
    main()