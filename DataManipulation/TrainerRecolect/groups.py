import json
from dataclasses import dataclass

@dataclass
class Group:
    name: str
    sets_in_group: list[str]
    trainers_using_group: list[str]

def add_group(groups):
    name = input("Enter group name: ")
    
    # Adding all sets of the groups
    sets_in_group = []
    while True:
        species = input(f"Enter Pokemon Species (or press Enter to skip): ")
        if not species:
            break
        sets_in_group.append(species)
    
    # Adding all trainers that use the group
    trainers_using_group = []
    while True:
        tr = input(f"Enter Trainer (or press Enter to skip): ")
        if not tr:
            break
        trainers_using_group.append(tr)
    
    group = Group(name, sets_in_group, trainers_using_group)
    groups.append(group)
    print("Group added successfully!")

def save(groups):
    with open("groups.json", "w", encoding="UTF-8") as f:
        json.dump([group.__dict__ for group in groups], f, indent=4, ensure_ascii=False)

def load():
    try:
        with open("groups.json", "r", encoding="UTF-8") as f:
            groups_data = json.load(f)
            groups = [Group(**data) for data in groups_data]
    except FileNotFoundError:
        groups = []
    return groups

def main():
    groups = load()
    
    choice = -1
    while choice != 0:
        print("\nSelect an option:")
        print("1. Add Pokemon group")
        print("2. Save Pokemon groups to file")
        print("0. Exit")
        choice = int(input("Enter choice: "))
        
        if choice == 1:
            add_group(groups)
        elif choice == 2:
            save(groups)
            print("Groups saved successfully!")
        elif choice == 0:
            print("Exiting program...")
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()