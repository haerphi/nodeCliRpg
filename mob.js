const Healt = require('./healt.js');

class Mob extends Healt {
    constructor(type, nickname, lvl) {
        super(10 * (lvl / 2));
        this.nickname = nickname;
        this.type = type;
        this.lvl = lvl;
    }
    get name() {
        return this.nickname;
    }

    get level() {
        return this.lvl;
    }

    get status() {
        return this.type;
    }
}

module.exports = Mob