class Food{
    constructor(){
        this.foodStock;
        this.lastFed;
        this.image=loadImage('milk.png')
    }
    
    display(){
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if (this.foodStock!==0) {
            for (var i=0;i<this.foodStock;i++) {
                if (i%10===0) {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        } 
        currentTime=hour();
        if (currentTime===(lastFed+1)) {
            update("playing");
            foodObj.garden();
        } else if(currentTime===(lastFed+2)){
            update("sleeping");
            foodObj.bedroom();
        } else if(currentTime===(lastFed+1)&&currentTime===(lastFed+4)){
            update("bathing");
            foodObj.washroom();
        }else{
            update("hungry");
            foodObj.display();
        }
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }
    
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    deductFood(){
        if (this.foodStock>0) {
            this.foodStock=this.foodstock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    bathroom(){
        background(bedroomIMG,500,500);
    }

    garden(){
        background(gardenIMG,500,500);
    }

    washroom(){
        background(washroomIMG,500,500);
    }
}