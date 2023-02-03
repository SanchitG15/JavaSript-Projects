import inquirer from "inquirer";

async function playerPromptForDirection(){

    const results = await inquirer.prompt({    
        type : "list",
        name : "direction",
        message : "Which direction do you wanna go in ?",
        choices : ["Up", "Down", "Right", "Left"]
    });

    return results.direction;

}

export { playerPromptForDirection };