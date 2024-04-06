#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Intialize user balance and pin code
let myBalance = 10000;
let mypin = 1234;
// Print Welcome Message
console.log(chalk.magentaBright("Wellcome to Rakhail Style Codes - ATM Machine"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blueBright("Please enter your PIN code:"),
    }
]);
if (pinAnswer.pin === mypin) {
    console.log(chalk.greenBright("Your Pin is correct, Login Successfully!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawAmountMethod",
                type: "list",
                message: "Select Withdraw Amount Method",
                choices: ["Fast Cash", "Enter Amount by Own"]
            }
        ]);
        if (withdrawAns.withdrawAmountMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount by Fast Cash Method:",
                    choices: [1000, 3000, 5000, 10000, 15000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else {
                myBalance = fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withDraw Successfully`);
            }
        }
        else if (withdrawAns.withdrawAmountMethod === "Enter Amount by Own") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(chalk.overline(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.yellowBright(`Your Current Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.redBright("Your Pin is Incorrect, Please Try Again"));
}
