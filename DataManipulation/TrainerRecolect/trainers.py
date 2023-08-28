import json
from dataclasses import dataclass


@dataclass
class Trainer:
    name: str
    trainer_type: str
    win_streak_range: list[str]
    name_xy: str = None
    name_oras: str = None
    trainer_id: int = None
    pkmn_group: str = None
    ivs: int = None
    pokemon: list[str] = None


def add_trainer(trainers):
    name = input("Enter trainer name: ")
    for trainer in trainers:
        if trainer.name == name:
            print(f"Trainer '{name}' found!")
            pokemon = []
            for i in range(4):
                species = input(
                    f"Enter new Pokemon Species {i+1} (or press Enter to skip): ")
                if species:
                    pokemon.append(species)
            trainer.pokemon.extend(pokemon)
            print(f"New Pokemon added to trainer '{name}'!")
            return
    trainer_type = input("Enter trainer type: ")
    win_streak_range = input("Enter win streak range (e.g. 1-10, 21-30): ")
    win_streak_range = win_streak_range.split(",")
    win_streak_range = [range.strip() for range in win_streak_range]
    name_xy = input("Enter name in Pokemon X/Y (optional): ")
    name_oras = input(
        "Enter name in Pokemon Omega Ruby/Alpha Sapphire (optional): ")
    trainer_id = input("Enter trainer ID (optional): ")
    if trainer_id:
        trainer_id = int(trainer_id)
    pkmn_group = input("Enter Pokemon group (optional): ")
    ivs = input("Enter IVs (19, 23, 27, or 31) (optional): ")
    if ivs:
        ivs = int(ivs)
    pokemon = []
    for i in range(4):
        species = input(f"Enter Pokemon Species {i+1}: ")
        pokemon.append(species)
    trainer = Trainer(name, trainer_type, win_streak_range,
                      name_xy, name_oras, trainer_id, pkmn_group, ivs, pokemon)
    trainers.append(trainer)
    print("Trainer added successfully!")


def add_trainer_id(trainers):
    name = input("Enter trainer name: ")
    for trainer in trainers:
        if trainer.name == name:
            print(f"Trainer '{name}' found!")
            trainer_id = input("Enter trainer ID: ")
            trainer.trainer_id = int(trainer_id)
            print(f"Trainer ID added to trainer '{name}'!")
            return
    print(f"Trainer '{name}' not found.")


def save_trainers(trainers):
    with open("trainers.json", "w", encoding="UTF-8") as f:
        json.dump([trainer.__dict__ for trainer in trainers],
                  f, indent=4, ensure_ascii=False)


def load_trainers():
    try:
        with open("trainers.json", "r", encoding="UTF-8") as f:
            trainers_data = json.load(f)
            trainers = [Trainer(**data) for data in trainers_data]
    except FileNotFoundError:
        trainers = []
    return trainers


def main():
    trainers = load_trainers()

    choice = -1
    while choice != 0:
        print("\nSelect an option:")
        print("1. Add trainer")
        print("2. Add trainer ID")
        print("3. Save trainers to file")
        print("0. Exit")
        choice = int(input("Enter choice: "))

        if choice == 1:
            add_trainer(trainers)
        elif choice == 2:
            add_trainer_id(trainers)
        elif choice == 3:
            save_trainers(trainers)
            print("Trainers saved successfully!")
        elif choice == 0:
            print("Exiting program...")
        else:
            print("Invalid choice. Try again.")


if __name__ == "__main__":
    main()
