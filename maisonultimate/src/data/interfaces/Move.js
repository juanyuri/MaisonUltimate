export default class Move {
    constructor(name, type, category, bp, pp, accuracy, priority, description) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.bp = bp;
        this.pp = pp;
        this.accuracy = accuracy;
        this.priority = priority;
        this.description = description;
    }
}