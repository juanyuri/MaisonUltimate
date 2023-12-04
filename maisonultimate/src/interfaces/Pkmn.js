export default class Pkmn {
    constructor(id, numDex, species, level, abilities, baseStats,
        evs, ivs, weight, type1, type2, moves, nature,
         item, spriteIcon, spriteImage, totalStats, boosts) {

        this.id = id;
        this.numDex = numDex;
        this.species = species;
        this.level = level;
        this.abilities = abilities;
        this.chosenAbility = abilities[0]
        if(baseStats){
            this.baseStats = baseStats
        }else{
            this.baseStats = [0,0,0,0,0,0];
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
        this.spriteIcon = spriteIcon;
        this.spriteImage = spriteImage;
    }
}