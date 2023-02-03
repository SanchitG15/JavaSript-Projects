
import { GridObject } from "./GridObject.js";

class EnemyObject extends GridObject{
       #stats = {
            name : null,
            attack : 0,
            defense : 0,
            hp : 0
        }


    constructor(sprite, stats){
        super(sprite);
        this.type = "enemy";
        this.#stats = stats;
    }

    getName(){
        return this.#stats.name;
    }
    
    getStats(){
        return {
            attack : this.#stats.attack,
            defense : this.#stats.defense,
            hp : this.#stats.hp
        }
    }

    describe(){
        console.log(`${this.sprite}  You have found a ${this.#stats.name} !`);
        console.log(`${this.#stats.name}'s stats are ATK: ${this.#stats.attack}, DEF: ${this.#stats.defense}, HP: ${this.#stats.hp}`);
    }
    



}



export { EnemyObject };