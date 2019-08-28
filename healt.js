class Healt {
    constructor(hp, dmg) {
        this.hp = hp;
        this.dmg = dmg
    }
    get life() {
        return this.hp;
    }

    dealDmg() {
        let rng = Math.round(Math.random() * (21 - 0) + 0);
        if (rng < 10) {
            return 0;
        } else if (rng === 20) {
            return this.dmg * 2;
        } else if (rng >= 10) {
            return this.dmg;
        }
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