export default class PkmnSet {
    constructor(id, numDex, species, level, abilities, baseStats,
        evs, ivs, weight, type1, type2, imageUrl, moves, nature, setNumber,
        boosts, item, setName, trainersPool, totalStats) {

        this.id = id;
        this.numDex = numDex;
        this.species = species;
        this.level = level;
        this.abilities = abilities;
        this.baseStats = baseStats;
        this.evs = evs;
        this.ivs = ivs;
        this.weight = weight;
        this.type1 = type1;
        this.type2 = type2;
        this.imageUrl = imageUrl;
        this.moves = moves;
        this.nature = nature;
        this.setNumber = setNumber;
        this.boosts = boosts;
        this.item = item;
        this.setName = setName;
        this.trainersPool = trainersPool;
        this.totalStats = totalStats;
    }
}