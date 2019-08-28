class Room {
    constructor(type, way, mob, loot) {
        this.type = type
        this.way = way;
        this.mob = mob;
        this.loot = loot;
    }
    get ways() {
        return this.way;
    }
    get info() {
        return [this.type, this.mob, this.loot];
    }
}

module.exports = Room