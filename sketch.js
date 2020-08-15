var dog,happyDog;
var database;
var foodS,foodStock;
var foodObj;
var lastFed,fedTime;
var button1,button2;
var gameState,changingGameState,readingGameState;
var bedroom,garden,washroom;
var currentTime;

function preload(){
  dogIMG=loadImage("dogImg1.png");
  happyDogIMG=loadImage("dogImg.png");
  bedroomIMG=loadImage("bedroom.png");
  gardenIMG=loadImage("garden.png");
  washroomIMG=loadImage("washroom.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogIMG);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46,139,87);
  foodObj.display();
  fill(255,255,254);
  textSize(15);
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
  if (gameState!=="hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogIMG);
  }
  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  if (lastFed>=12) {
    text("last fed:"+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("last fed: 12 AM",350,30);
  }else{
    text("last fed:"+lastFed+"AM",350,30);
  }
  //text("Food Remaining:"+foodS,170,100);
  drawSprites();
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog() {
  dog.addImage(happyDogIMG);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x) {
  if (x<=0) {
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}