#!/usr/bin/env node

console.clear();

const Donjon = require('./donjon.js');
const Hero = require('./hero.js');

var inquirer = require('inquirer');
const boxen = require('boxen');
const chalk = require('chalk');
var readlineSync = require('readline-sync');

/* instiation */
let hero = new Hero(readlineSync.question('May I have your name hero ? '));
let dj = new Donjon(1);

console.log("routes du donjon : ")
dj.rooms.forEach(el => {
    console.log(el);
})


console.log(`Bienvenue dans le donjon ${chalk.blue(hero.name)} !`);

let cmd = "";
do {
    console.log('------------');
    if (dj.getActuelRoomStatus() === "trapped") {
        console.log(`The door get closed behind you...`);
    }


    console.log(`${chalk.red("This is your options : (You only need to type the first letter)")} `);
    let choice = dj.getRoomChoice();
    choice.forEach((el) => {
        console.log(`- ${chalk.green(el)}`);
    });

    cmd = readlineSync.question(`${chalk.blue("Quel est ton choix ?")} `);
    choice.forEach((el) => {
        if (el[0].toLocaleLowerCase() === cmd.toLocaleLowerCase()) {
            console.log("Choix correct");
            dj.moveHero(cmd.toLocaleLowerCase());
        }
    });

    hero.getDamage(1);
} while (hero.isAlive() && dj.bossAlive() && cmd != "exit");

if (cmd === "exit") {
    console.log('Nooooo, you left us...');
} else if (!hero.isAlive()) {
    console.log("Oh... You died...");
} else if (!dj.bossAlive()) {
    console.log("Well played, you killed the boss !");
}