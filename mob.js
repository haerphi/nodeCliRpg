const Healt = require('./healt.js');

class Mob extends Healt {
    constructor(type, nickname, lvl, dmg) {
        super(10 * lvl);
        this.nickname = nickname;
        this.type = type;
        this.lvl = lvl;
        this.dmg = dmg
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