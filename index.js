#!/usr/bin/env node

console.clear();

const Donjon = require('./donjon.js');
const Hero = require('./hero.js');

var figlet = require('figlet');
const boxen = require('boxen');
const chalk = require('chalk');
var readlineSync = require('readline-sync');


console.log(boxen(figlet.textSync('Dongeon me', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
}), {
    padding: 1
}));

/* instiation */
let hero = new Hero(readlineSync.question('May I have your name hero ? '));
let dj = new Donjon(1); // 1 = le niveau du donjon

console.log("Route donjon : ");
dj.rooms.forEach(el => {
    console.log(el.ways)
})

function combat(mob) {
    // Instiation du combat
    // console.clear();
    console.log(boxen(figlet.textSync('Combat', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }), {
        padding: 1
    }));
    // Round qui ne se finit que quand un des deux est mort
    console.log(boxen("Fight logs"));
    do {
        let dmg = hero.dealDmg();
        mob.getDamage(dmg);
        console.log(`${chalk.red("mob")} took ${dmg} dmg.`);
        if (mob.isAlive()) {
            let dmg = mob.dealDmg();
            hero.getDamage(dmg);
            console.log(`${chalk.blue("hero")} took ${dmg} dmg.`);
        }
    } while (hero.isAlive() && mob.isAlive());
}

console.log(`Bienvenue dans le donjon ${chalk.blue(hero.name)} !`);

let cmd = "";
do {
    /* recuperation de la salle */
    let infoRoom = dj.getRoomInfo();
    console.log(infoRoom);
    if (infoRoom[1] != null) { // est-ce qu'il y a un mob dans la salle
        combat(infoRoom[1]); // debut du combat
    }
    console.log(boxen(figlet.textSync('Room', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }), {
        padding: 1
    }));
    // si le hero est envie après le combat
    // console.clear();
    console.log(`${hero.name} - hp : ${hero.hp}`)
    if (hero.isAlive() && dj.bossAlive()) {
        // Choix disponible
        dj.lootTheRoom();
        console.log(`${chalk.red("This is your options : (You only need to type the first letter)\n exepct for 'exit'")} `);
        let choice = dj.getRoomChoice();
        choice.forEach((el) => {
            console.log(`- ${chalk.green(el)}`);
        });
        console.log(`- ${chalk.green("exit (close the game)")}`);

        // verfication du choix
        cmd = readlineSync.question(`${chalk.blue("Quel est ton choix ?")} `);
        choice.forEach((el) => {
            if (el[0].toLocaleLowerCase() === cmd.toLocaleLowerCase()) {
                console.log("Choix correct");
                // deplacement du hero dans le donjon
                dj.moveHero(cmd.toLocaleLowerCase());
            }
        });
    }
    // good luck and continue
}
while (hero.isAlive() && dj.bossAlive() && cmd != "exit");

console.clear();
/* fin du donjon */
if (cmd === "exit") {
    console.log('Nooooo, you left us...');
} else if (!hero.isAlive()) {
    console.log(boxen(figlet.textSync('You died...', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }), {
        padding: 1
    }));
} else if (!dj.bossAlive()) {
    console.log(boxen(figlet.textSync('Victory', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }), {
        padding: 1
    }));
    console.log("Well played, you killed the boss !");
}