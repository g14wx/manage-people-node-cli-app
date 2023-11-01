import inquirer, {Answers, Question} from "inquirer";
import {CustomTable, ICustomTable} from "./custom_table.js";

const table: ICustomTable = new CustomTable("People");

const questions: Question[] = [
    {
        name: "good",
        message: "hello input question?",
        type: "input",
    }
];

table.drawTable();

function ask() : Promise<Answers> {
    return inquirer.prompt(questions);
}

const result: Answers = await ask();

console.log("this is the result: ", result.good);