export default class Group {
    constructor(name, sets_in_group, trainers_using_groups) {
        this.name = name;
        this.pkmnSets = sets_in_group;
        this.trainers = trainers_using_groups
    }
}