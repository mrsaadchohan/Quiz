import inquirer from 'inquirer';
import chalk from 'chalk';

let URL = "https://opentdb.com/api.php?amount=6&category=18&difficulty=medium";

let funcget = async (data: string) => {
    try {
        let fetchdata = await fetch(data);
        let res = await fetchdata.json();
        return res.results || []; // Make sure 'results' property exists, and default to an empty array if it doesn't
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

let data = await funcget(URL);

if (data.length === 0) {
    console.error("No data retrieved. Exiting the program.");
} else {
    startquiz();
}

async function startquiz() {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "Names",
        message: "What is Your Name",
    });

    console.log(score);

    for (let i = 0; i < data.length; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answer.map((val) => val),
        });

        if (ans.quiz == data[i].correct_answer) {
            ++score;
        }
    }

    console.log(`Dear ${chalk.green(name.Names)}, Your Score is ${chalk.red(score)} `);
}


