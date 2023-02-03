import { GridObject } from "./GridObject.js";
import { ItemObject } from "./ItemObject.js";
import { EnemyObject } from "./EnemyObject.js";
import { Player } from "./Player.js";
import { playerPromptForDirection } from "./PlayerPrompt.js";


class Grid{
    #currentObject; 

    constructor(width,height,playerCol = 0, playerRow = height - 1){

        this.width = width;
        this.height = height; 
        this.playerCol = playerCol;
        this.playerRow = playerRow;
        this.player = new Player("Monkey King", {attack : 10, defense: 4, hp: 20});

        this.grid = [];

        for(let row = 0; row < height; row++){
            let thisRow = [];
            for(let col = 0; col < width; col++){
                thisRow.push(new GridObject());
            }
            this.grid.push(thisRow);
        }

        this.grid[height-1][0] = new GridObject("🐵", "player");
        this.grid[0][width-1] = new GridObject("🌟","win");

        this.startGame();

    }

async startGame(){
    while(this.player.getStats().hp > 0){
        this.displayGrid();
        const response = await playerPromptForDirection();

        switch(response){
            case "Up": {
                this.moveUp()
                break;
            }
            case "Down":{
                this.moveDown()
                break;
            }
            case "Right":{
                this.moveRight()
                break;
            }
            case "Left":{
                this.moveLeft()
                break;
            }
            default : {
                this.moveRight()
                break;
            }
        }
    }
}

executeTurn(){
    if(this.grid[this.playerRow][this.playerCol].type === "win"){
        console.log("🥳 Congrats you won !!");
        process.exit();
    }
    if(this.#currentObject.type === "undiscovered" ){
        return;
    }

    if(this.#currentObject.type === "item"){
        const itemStats = this.#currentObject.getStats();
        this.player.addToStats(itemStats);
        this.#currentObject.describe();
        return;
    }

    this.#currentObject.describe();
    const enemyStats = this.#currentObject.getStats();
    const enemyName = this.#currentObject.getName();
    const playerStats = this.player.getStats();

    if(enemyStats.defense > playerStats.attack){
        console.log(`You lost .. ${enemyName} was too powerful ! `);
        process.exit();
    }

    let totalPlayerDamage = 0;

    while(enemyStats.hp > 0){
        const enemyDamageTurn = playerStats.attack - enemyStats.defense;
        const playerDamageTurn = enemyStats.attack - playerStats.defense;

        if(enemyDamageTurn > 0){
            enemyStats.hp -= enemyDamageTurn;
        }

        if(playerDamageTurn > 0){
            playerStats.hp -= playerDamageTurn;
            totalPlayerDamage += playerDamageTurn;
        }

        if(playerStats.hp <= 0){
            console.log(`You lost .. ${enemyName} was too powerful ! `);
            process.exit();
        }

        this.player.addToStats({hp: -totalPlayerDamage});
        console.log(`You defeated ${enemyName}! Your stats are : `);
        this.player.describe();

    }
}

generateRandom(){
    const random = Math.random();
    let object;

    if(random < 0.33){
        object = new ItemObject("⚔️",{name: "Sword", attack : 3, defense : 1, hp : 0});
    }
    else if(random < 0.66){
        object = new EnemyObject("🕷️",{name: "Spider", attack : 5, defense : 1, hp : 6});
    }
    else{
        object = new GridObject();
    }
    return object;
}

displayGrid(){
    for(let row = 0; row < this.height; row++){
        for(let col = 0; col < this.width; col++){
            process.stdout.write(this.grid[row][col].sprite +"\t");
        }
        process.stdout.write("\n");
    }
}

moveRight(){
    if(this.playerCol === this.width - 1){
        console.log("Cannot move further right !");
        return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObject("👣","discovered");
    this.playerCol += 1;

    if(this.grid[this.playerRow][this.playerCol].type === "discovered"){
        this.grid[this.playerRow][this.playerCol].describe();
        this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
        return;
    }

    this.#currentObject = this.generateRandom();
    this.executeTurn();
    this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
}

moveLeft(){
    if(this.playerCol === 0){
        console.log("Cannot move further left !");
        return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObject("👣","discovered");
    this.playerCol -= 1;

    if(this.grid[this.playerRow][this.playerCol].type === "discovered"){
        this.grid[this.playerRow][this.playerCol].describe();
        this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
        return;
    }

    this.#currentObject = this.generateRandom();
    this.executeTurn();

    this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
}

moveUp(){
    if(this.playerRow === 0){
        console.log("Cannot move further up !");
        return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObject("👣","discovered");
    this.playerRow -= 1;

    if(this.grid[this.playerRow][this.playerCol].type === "discovered"){
        this.grid[this.playerRow][this.playerCol].describe();
        this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
        return;
    }

    this.#currentObject = this.generateRandom();
    this.executeTurn();

    this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
}

moveDown(){
    if(this.playerRow === this.height - 1){
        console.log("Cannot move further down !");
        return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObject("👣","discovered");
    this.playerRow += 1;

    if(this.grid[this.playerRow][this.playerCol].type === "discovered"){
        this.grid[this.playerRow][this.playerCol].describe();
        this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
        return;
    }

    this.#currentObject = this.generateRandom();
    this.executeTurn();

    this.grid[this.playerRow][this.playerCol] = new GridObject("🐵", "player");
}




}

new Grid(5,5);