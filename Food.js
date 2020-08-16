class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage('milk.png')
    }
    
    display(){
        fill("white");
        textSize(15);
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if (lastFed>=12) {
            text("last fed:"+lastFed%12+"PM",350,30);
          }else if(lastFed===0){
            text("last fed: 12 AM",350,30);
          }else{
            text("last fed:"+lastFed+"AM",350,30);
        }
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

    bedroom(){
        background(bedroomIMG,500,500);
    }

    garden(){
        background(gardenIMG,500,500);
    }

    washroom(){
        background(washroomIMG,500,500);
    }
}