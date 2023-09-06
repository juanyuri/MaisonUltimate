import requests
from bs4 import BeautifulSoup

import json

def find_component(html, idx, css_selector):
    """Find the atomic structure using the 'css_selector'. It will selected by the index 'idx' 
    Index will be passed by human, not automated in for's """
    
    #Classes does not have spaces, then a tag may have multiple classes
    css_selector = css_selector.replace(" ", ".")
    return html.select(css_selector)[idx]

def find_specific_attr(html, tag, attr_type, attr_value):
    return html.find(tag, attrs={attr_type:attr_value})

def extract_one(html, css_selector, option=''):
    element = html.select_one(css_selector)
    
    if element is not None:
        if option == 'text':
            return element.text
        elif option == 'title':
            return element.get('title')
        elif option == 'attrs':
            return html.find('a', attrs={"title":"herramientas de usuario"})
        else:
            return element
    
    
def get_html():
    url = "https://www.wikidex.net/wiki/Lista_de_movimientos_por_tipo"
    response = requests.get(url).content
    return BeautifulSoup(response, 'html.parser')


def main():
    soup = get_html()
    
    table = find_component(soup, 1, '.lista sortable')
    #table_rows = find_component(table, 'tbody tr')
    print(table)
    """ move_name = extract_one(table, 'tbody tr td a', 'title')
    print(move_name) """
    
    """ linked2 = find_attr(soup, 'a', 'title', 'Clase físico')
    linked = find_attr(soup, 'a', 'title', 'Carisma')
    print(linked) """
    
    

if __name__ == "__main__":
    main()