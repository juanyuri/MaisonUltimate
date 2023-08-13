export default class Move {
    constructor(name, type, category, bp, pp, description, priority) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.bp = bp;
        this.pp = pp;
        this.description = description;
        this.priority = priority;
    }
}