var dog,sadDog,happyDog;
var feedDogButton, restockFoodButton;
var foodObj, foodStock;
var database;
var foodS;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

  //mk = loadImage("Images/Milk.png");
  
}

function setup() {
  database = firebase.database();
  
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.2;

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feedDogButton = createButton("Feed the dog");
  feedDogButton.position(210,100);
  feedDogButton.mousePressed(feedDog);

  restockFoodButton = createButton("Add food");
  restockFoodButton.position(300,100);
  restockFoodButton.mousePressed(addFoods);
  
}

function draw() {
  background(46,139,87);
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to read food Stock
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
  })
}

//function to update food stock and last fed time


//function to add food in stock
function addFoods(){
  foodS++;

  database.ref('/').update({
    food:foodS
  })
}
