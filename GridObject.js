
class GridObject{

    #sprites = ["🌴","🎄","🌳","🌲"];

    constructor(sprite, type = "undiscovered"){

        if(!sprite){
            const randomIndex = Math.floor(Math.random() * this.#sprites.length);
            this.sprite = this.#sprites[randomIndex];
        }else{
            this.sprite = sprite;

        }       

        this.type = type;


    }

    describe(){
        const random = Math.random();

        if(this.type === "discovered"){           
            if(random < 0.33){
                console.log("Familiar Surroundings !");
            }
            else if(random < 0.66){
                console.log("Easy up here !");
            }
            else{
                console.log("Have seen this before !");
            }
        }

    }
    
}

export { GridObject };