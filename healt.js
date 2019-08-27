class Healt {
    constructor(hp) {
        this.hp = hp;
    }
    get life() {
        return this.hp;
    }

    getDamage(dmg) {
        this.hp -= dmg;
    }

    isAlive() {
        if (this.hp <= 0) {
            return false
        } else {
            return true;
        }
    }
}

module.exports = Healt