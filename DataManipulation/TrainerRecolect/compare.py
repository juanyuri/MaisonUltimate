import json

def load(namefile):
    try:
        with open(namefile, "r", encoding="UTF-8") as f:
            groups_data = json.load(f)
    except FileNotFoundError:
        groups_data = []
    return groups_data

def main():
    grupos = load("groups.json")
    ruby = list(filter(lambda g: g['name'] == 'Ruby1', grupos))
    set1 = set(ruby[0]['sets_in_group'])
    
    emerald = list(filter(lambda g: g['name'] == 'Sapphire1', grupos))
    set2 = set(emerald[0]['sets_in_group'])

    print(f"Length of set {ruby[0]['name']} {len(set1)}")
    print(f"Length of set {emerald[0]['name']} {len(set2)}")
    print(f"Number of equal values: {len(set1 & set2)}")
    print(f"Number of different values: {len(set1 ^ set2)}")

if __name__ == "__main__":
    main()