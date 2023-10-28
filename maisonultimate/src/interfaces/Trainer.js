export default class Trainer {
    constructor(name, trainer_type, win_streak_range, name_xy = null, name_oras = null,
        trainer_id = null, pkmn_group = null, ivs = null, pokemon = null) {
        this.name = name;
        this.trainer_type = trainer_type;
        this.win_streak_range = win_streak_range;
        this.name_xy = name_xy;
        this.name_oras = name_oras;
        this.trainer_id = trainer_id;
        this.pkmn_group = pkmn_group;
        this.ivs = ivs;
        this.pokemon = pokemon;
    }
}