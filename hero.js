const Heatl = require('./healt.js');

class Hero extends Heatl {
    constructor(nickname) {
        super(100, 5);
        this.nickname = nickname;
        this.exp = 0;
        this.lvl = 1;
        this.inventory = [];
    }
    get name() {
        return this.nickname;
    }

    get level() {
        return this.lvl;
    }

    affInventory() {
        let userName = readlineSync.question('gne ? ');
        console.log(userName);
    }
}

module.exports = Hero