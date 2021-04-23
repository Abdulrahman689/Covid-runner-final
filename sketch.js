const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player1,
  player2,
  virus,
  virusImg,
  playerImgscared,
  playerImgconfident,
  ground,
  groundImg,
  virusGroup;
var sanitizer, mask, sanitizerGroup, maskGroup, sanitizerImg, maskImg;
var playerEnd, gameOver, gameOverImg;
var gameState = 1;
var score = 0;

function preload() {
  playerImgscared = loadAnimation("Images/Runner-1.png", "Images/Runner-2.png");
  groundImg = loadImage("Images/realBg.png");
  virusImg = loadImage("Images/1stvirus.png");
  sanitizerImg = loadImage("Images/sanitizer.png");
  maskImg = loadImage("Images/mask.png");
  playerEnd = loadAnimation("Images/Runner-1.png");
  gameOverImg = loadAnimation("Images/gameOver.png");
}
function setup() {
  background("green");
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  ground = createSprite(windowWidth / 2, windowHeight / 2, 2000, windowHeight);
  ground.addImage(groundImg);
  ground.scale = 5;
  ground.velocityY = 5;

  player1 = createSprite(windowWidth / 2, windowHeight - 100, 50, 50);
  player1.scale = 0.09;
  player1.setCollider("circle", 0, 0, 250);
  player1.addAnimation("boy", playerImgscared);
  player1.addAnimation("boy2", playerEnd);

  virusGroup = new Group();
  sanitizerGroup = new Group();
  maskGroup = new Group();
}
function draw() {
  Engine.update(engine);
  console.log(getFrameRate());
  if (ground.y > windowHeight + 100) {
    ground.y = windowHeight / 2;
  }
  //gamestate 1 is the state the player starts with (aka first state or play state)
  if (gameState === 1) {
    textSize(25);
    text("SCORE: " + score, 1000, 600);
    
    console.log("moving");
    if (keyDown(LEFT_ARROW)) {
      player1.x = player1.x - 7;
    }

    if (keyDown(RIGHT_ARROW)) {
      player1.x = player1.x + 7;
    }

    if (virusGroup.isTouching(player1)) {
      gameState = 2;
    }

    if (sanitizerGroup.isTouching(player1)) {
      score = score + Math.round(random(1, 2));
      sanitizerGroup[0].destroy();
    }
    if(score >=1){
      gameState=3;
    }

    rectMode(CENTER);
    spawnSanitizer();
    spawnVirus();
    //Game over state(occasional)
  } else if (gameState === 2) {
    textSize(25);
    text("SCORE: " + score, 1000, 600);
    player1.velocityY = 0;
    ground.velocityY = 0;
    console.log("2");
    virusGroup.setVelocityYEach(0);
    virusGroup.setVelocityXEach(0);
    player1.changeAnimation("end", playerEnd);

    gameOver = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
    gameOver.addImage(gameOverImg);
    // Winner state or occasional winning state(when you get x amount of score needed)
  } else if (gameState === 3) {
    textSize(10);
    fill("red");
    text("KILL THE VIRUS", 50, 200);
    if (keyDown(LEFT_ARROW)) {
      player1.x = player1.x - 7;
    }

    if (keyDown(RIGHT_ARROW)) {
      player1.x = player1.x + 7;
    }
    if (virusGroup.isTouching(player1)) {
      gameState = 4;
    }
    // follows up with gs 3
  } else if (gameState === 4) {
    textSize(10)
    fill("green");
    text("Good job, you killed the virus",50,400);
    player1.velocityY = 0;
    ground.velocityY = 0;
    virusGroup.setVelocityYEach(0);
    virusGroup.setVelocityXEach(0);
    player1.changeAnimation("end", playerEnd);
  }
  spawnVirus();
  drawSprites();
}
function spawnVirus() {
  if (frameCount % 15 === 0) {
    virus = createSprite(windowWidth / 2, windowHeight / 2, 5, 5);
    virus.addImage(virusImg);
    virus.velocityY = 7;
    virus.scale = 0.2;
    virusGroup.add(virus);
    virus.y = Math.round(random(60, 100));
    virus.x = Math.round(random(200, 1000));
  }
}
function reset() {}
function spawnSanitizer() {
  if (frameCount % 45 === 0) {
    sanitizer = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
    sanitizer.addImage(sanitizerImg);
    sanitizer.velocityY = 14;
    sanitizer.scale = 0.5;
    sanitizerGroup.add(sanitizer);
    sanitizer.x = Math.round(random(200, 1000));
    sanitizer.y = Math.round(random(50, 110));
  }
}
function spawnMask() {}
