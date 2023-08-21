export default class Pkmn {
    constructor(id, numDex, species, level, abilities, baseStats,
        evs, ivs, weight, type1, type2, moves, nature, boosts,
         item, totalStats, sprite) {

        this.id = id;
        this.numDex = numDex;
        this.species = species;
        this.level = level;
        this.abilities = abilities;
        this.chosenAbility = abilities[0]
        if(baseStats){
            let stats = []
            stats.push(baseStats['hp'])
            stats.push(baseStats['at'])
            stats.push(baseStats['df'])
            stats.push(baseStats['sa'])
            stats.push(baseStats['sd'])
            stats.push(baseStats['sp'])
            this.baseStats = stats
        }else{
            this.baseStats = baseStats;
        }
        this.evs = evs;
        this.ivs = ivs;
        this.weight = weight;
        this.type1 = type1;
        this.type2 = type2;
        
        if(!moves)
            this.moves = []
        else
            this.moves = moves;
        
        this.nature = nature;
        this.boosts = boosts;
        this.item = item;
        this.totalStats = totalStats;
        this.sprite = sprite;
    }
}