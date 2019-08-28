const Room = require('./room.js');
const Mob = require('./mob.js');
class Donjon {
    constructor(lvl, bossName) {
        this.level = lvl;
        this.rooms = [];
        this.boss = new Mob("boss", bossName, lvl, 20);
        this.heroRoom = 0;
        this.init();
    }
    init() {
        this.rooms.push(new Room("start", [-1, -1, 1, -1], null, [0]));
        let maxRoom = 5;
        //chemin vers le boss
        for (let i = 1; i < maxRoom + 1; i++) {
            //récuperer d'où vient le joueur
            let comingDoor = this.rooms[i - 1].ways;
            for (let h = 0; h < comingDoor.length; h++) {
                if (comingDoor[h] === i) {
                    if (h === 0) {
                        comingDoor = 1;
                        break;
                    } else if (h === 1) {
                        comingDoor = 0;
                        break;
                    } else if (h === 2) {
                        comingDoor = 3;
                        break;
                    } else if (h === 3) {
                        comingDoor = 2;
                        break;
                    }
                }
            }
            // Remet la sortie au bon endroit (pour revenir en arrière)
            let ways = [-1, -1, -1, -1];
            ways[comingDoor] = i - 1;
            // (pour avancer)
            let randomWay = 0;
            do {
                randomWay = Math.round(Math.random() * (3 - 0) + 0);
            } while (ways[randomWay] != -1);
            ways[randomWay] = i + 1;
            let status = "basic";
            this.rooms.push(new Room(status, ways, new Mob("zombie", "Gorge", 1, 2), [0]));
        }
        //last room (Boss)
        let comingDoor = this.rooms[this.rooms.length - 1].ways;
        for (let h = 0; h < comingDoor.length; h++) {
            if (h === 0) {
                comingDoor = 1;
                break;
            } else if (h === 1) {
                comingDoor = 0;
                break;
            } else if (h === 2) {
                comingDoor = 3;
                break;
            } else if (h === 3) {
                comingDoor = 2;
                break;
            }
        }
        // Remet la sortie au bon endroit (pour revenir en arrière)
        let ways = [-1, -1, -1, -1];
        ways[comingDoor] = this.rooms.length - 1;
        this.rooms.push(new Room("Boss Room", ways, this.boss, [0]));

    }

    getActuelRoomStatus() {
        return this.rooms[this.heroRoom].type;
    }

    getRoomChoice() {
        let result = [];
        for (let i = 0; i < this.rooms[this.heroRoom].ways.length; i++) {
            let prefix = "";
            if (i === 0) {
                prefix = "Left";
            } else if (i === 1) {
                prefix = "Right";
            } else if (i === 2) {
                prefix = "Forward";
            } else if (i === 3) {
                prefix = "Backward";
            }
            if (this.rooms[this.heroRoom].ways[i] >= 0) {
                result.push(prefix);
            }
        }
        return result;
    }

    moveHero(choice) {
        if (choice === "l") {
            this.heroRoom = this.rooms[this.heroRoom].ways[0];
        } else if (choice === "r") {
            this.heroRoom = this.rooms[this.heroRoom].ways[1];
        } else if (choice === "f") {
            this.heroRoom = this.rooms[this.heroRoom].ways[2];
        } else if (choice === "b") {
            this.heroRoom = this.rooms[this.heroRoom].ways[3];
        }
    }

    getRoomInfo() {
        return this.rooms[this.heroRoom].info;
    }

    lootTheRoom() {
        this.rooms[this.heroRoom].mob = null;
        let loot = this.rooms[this.heroRoom].loot
        this.rooms[this.heroRoom].loot = []
        return loot;
    }

    bossAlive() {
        return this.boss.isAlive();
    }
}

module.exports = Donjon