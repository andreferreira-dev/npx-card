const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");

const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

// clear the terminal before showing the npx card
clear()

const prompt = inquirer.createPromptModule();

const questions = [{
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [{
            // Use chalk to style headers
            name: `Toss an ${chalk.bold("email")}?`,
            value: () => {
                open("mailto:andreferreira.dev@gmail.com");
                console.log("\nLooking forward to hearing your message and replying to you!\n");
            }
        },
        {
            name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
            value: () => {
                // cliSpinners.dots;
                const loader = ora({
                    text: ' Downloading Resume',
                    spinner: cliSpinners.material,
                }).start();
                let pipe = request('https://andreferreira-dev.github.io/resume/Resume-Andre-Luis-Ferreira.pdf').pipe(fs.createWriteStream('./Resume-Andre-Luis-Ferreira.pdf'));
                pipe.on("finish", function() {
                    let downloadPath = path.join(process.cwd(), 'Resume-Andre-Luis-Ferreira.pdf')
                    console.log(`\nResume Downloaded at ${downloadPath} \n`);
                    open(downloadPath)
                    loader.stop();
                });
            }
        },
        {
            name: "Exit",
            value: () => {
                const hours = new Date().getHours();
                const dayNight = hours >= 6 && hours <= 18 ? 'day' : 'night';
                console.log(`Good bye, have a nice ${dayNight}!\n`);
            }
        }
    ]
}];

const data = {
    name: chalk.bold.hex('#0598ce')("                     André Luís Ferreira"),
    // handle: chalk.white("@andreferreira-dev"),
    fact: chalk.hex('#f4ad2c')('Transforming coffe to code since 2009!'),
    twitter: chalk.hex('#599300')("https://twitter.com/adnux"),
    github: chalk.hex('#98d400')("https://github.com/andreferreira"),
    dev: chalk.hex('#c9eb03')("https://dev.to/adnux"),
    // dribbble: chalk.hex('#499982')("https://dribbble.com/adnux"),
    website: chalk.hex('#d5ed99')("https://andreferreira-dev.github.io"),
    npx: chalk.hex('#A1AB00')("npx andreferreira"),

    labelFact: chalk.hex('#f2e436').bold("          Fun Fact:"),
    labelTwitter: chalk.hex('#115862').bold("        Twitter:"),
    labelGitHub: chalk.hex('#146470').bold("         GitHub:"),
    labelDev: chalk.hex('#16717e').bold("           Dev:"),
    // labelDribbble: chalk.hex('#197e8d').bold("       Dribbble:"),
    labelWebsite: chalk.hex('#2f8a98').bold("        Website:"),
    labelCard: chalk.hex('#bdc44c').bold("                  Card:")
};


const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelFact}  ${data.fact}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelDev}  ${data.dev}`,
        // `${data.labelDribbble}  ${data.dribbble}`,
        `${data.labelWebsite}  ${data.website}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.bold("Hi there! I'm André Ferreira:")}`,
        `${chalk.bold("A passionate software engineer and full-stack developer from Brazil, ")}`,
        `${chalk.bold("i love to learn new things and technologies, and to taste different ")}`,
        `${chalk.bold("kind of beers! ")}`,
        `${chalk.bold("Send me an email if you want to collab!")}`
    ].join("\n"), {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "blue"
    }
);

// Show the boxen
console.log(me);

prompt(questions).then(answer => answer.action());