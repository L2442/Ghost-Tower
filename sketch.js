var bg, bgImage;
var ghost, ghostImageJ, ghostImageS;
var invisibleGround, invisibleBlockGroup, invisibleBlock;
var gameState;
var PLAY = 1;
var END = 0;
var door, doorGroup, doorImage;
var climber, climberGroup, climberImage;
var snd;



function preload(){
  bgImage = loadImage("tower.png");
  ghostImageJ = loadImage("ghost-jumping.png");
  ghostImageS = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  snd = loadSound("spooky.wav");
}

function setup(){
  createCanvas(500,500);
  snd.play();
  
  gameState = PLAY;
  bg = createSprite(250,250,0,0);
  bg.addImage("BGI", bgImage);
  bg.scale = 0.8;
  bg.velocityY = 4;
  
  ghost = createSprite(250,430,0,0);
  ghost.addImage("GIS", ghostImageS);
  ghost.addImage("GIJ", ghostImageJ);
  ghost.scale = 0.35;
  
  invisibleGround = createSprite(250,500,500,10);
  invisibleGround.visible = false;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  
  if(gameState === PLAY){
    
 if(bg.y > 500){
   bg.y = 250;
}
    ghost.collide(climberGroup);
  if(keyDown("space")){
    ghost.velocityY = -4;
    invisibleGround.destroy();
  }
    ghost.collide(invisibleGround);
    ghost.velocityY = ghost.velocityY + 0.5;
  if(keyDown("right")){
    ghost.x = ghost.x + 5;
  }
      if(keyDown("left")){
    ghost.x = ghost.x - 5;
  }
    if(frameCount%120 === 0){
      doors();
    }
    if(ghost.isTouching(invisibleBlockGroup)){
      gameState = END;
    }
  }
  
  if(gameState === END){
    ghost.destroy();
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    bg.velocityY = 0;
    invisibleBlockGroup.setVelocityYEach(0);
    doorGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    invisibleBlockGroup.setLifetimeEach(-1);
  }
  
  
  
  drawSprites();
}
  
function doors(){
  door = createSprite(150,-50,50,50);
  door.addImage("DI", doorImage);
  door.x = Math.round(random(100,400));
  door.velocityY = 2;
  climber = createSprite(150,20,50,50);
  climber.addImage("CI", climberImage);
  invisibleBlock = createSprite(door.x,22,climber.width, climber.height-15);
  invisibleBlock.visible = false;
  climber.x = door.x;
  climber.velocityY = 2;
  invisibleBlock.velocityY = climber.velocityY;
  door.lifetime = 250;
  climber.lifetime = 250;
  invisibleBlock.lifetime = 300;
  door.depth = ghost.depth;
  ghost.depth = ghost.depth+1;
  climberGroup.add(climber);
  doorGroup.add(door);
  invisibleBlockGroup.add(invisibleBlock);
}



