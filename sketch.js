var manImage,lionImage,hammerImage,forestImage,eagleImage;
var manSprite,lionSprite,hammerSprite,forestSprite,eagleSprite;
var hammer;
var enemySprite;
var enemyGroup;
var PLAY =1;
var END =0;
var gameState= PLAY;
var score=0; 
var gameoverImage,gameoverSprite;
var reloadImage,reloadSprite;
var gameoverSound,hammerSound;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{


forestImage = loadImage("bg2.jpeg");
hammerImage = loadImage("hammer.png");
lionImage = loadImage("LION.png");
manImage = loadImage("thor.gif");
eagleImage= loadImage("eagle.png");	 
gameoverImage= loadImage("gameover.jpg");
reloadImage= loadImage("reload.jpg");
gameoverSound = loadSound("gameoversound.mp3");
hammerSound =loadSound("hammerh.mp3");
}

function setup() {
	createCanvas(windowWidth,windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
forestSprite = createSprite(800,425); 
forestSprite.addImage(forestImage);
forestSprite.scale= 1.2;

manSprite = createSprite(250,580); 
manSprite.addImage(manImage);
manSprite.scale= 2;	   

gameoverSprite = createSprite(800,400); 
gameoverSprite.addImage(gameoverImage);
gameoverSprite.scale=4.5;
gameoverSprite.visible=false;


reloadSprite = createSprite(700,650); 
reloadSprite.addImage(reloadImage);
reloadSprite.scale=1.5;
reloadSprite.visible=false;

//hammerSprite = createSprite(250,580); 
//hammerSprite.addImage(hammerImage);
	   
hammerGroup =createGroup();
enemyGroup =createGroup();


//lionSprite = createSprite(700,580); 
//lionSprite.addImage(lionImage);
 	   

//eagleSprite = createSprite(700,200); 
//eagleSprite.addImage(eagleImage);
 	   	



	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
 

 if(gameState===PLAY){
	 manSprite.visible=true;
	enemy();
  if(keyDown("UP_ARROW")){
	manSprite.y-=7;
	 
	}
	
	if(keyDown("DOWN_ARROW")){
	  manSprite.y+=7;
	  
	}

	if(keyDown("space")){
		spawnHammer();
	}
	if(hammerGroup.isTouching(enemyGroup)){
		enemyGroup.destroyEach();
		hammerGroup.destroyEach();
		score=score+5;
		}
		if(manSprite.isTouching(enemyGroup))
		{
		  manSprite.destroy();
		  enemyGroup.destroyEach();
		  hammerGroup.setLifetimeEach(-1);
		  if(manSprite.isTouching(enemyGroup))
		  {
			gameState=END;
		  
		  }

		}
		else if(gameState===END){
			gameoverSound.play();
			gameoverSound.setVolume(0.1)
			manSprite.visible=false;
			enemyGroup.destroyEach();
			hammerGroup.destroyEach();
			hammerGroup.setLifetimeEach(-1);
			hammerGroup.setVelocityXEach(0);
		   enemyGroup.setLifetimeEach(-1);
		   enemyGroup.setVelocityXEach(0);
			gameoverSprite.visible= true;
			reloadSprite.visible= true;
			if(mousePressedOver(reloadSprite)){
			 reset();
			}
		   }
	}
  drawSprites();
  textSize(35);
  fill("yellow");
  strokeWeight(4);
  stroke("black")
  text(" SCORE : "+score,30,50);


}

function enemy(){


	if(frameCount%100===0){
	  
	  
	enemySprite=createSprite(1600,Math.round(random(50,700)),50,50)
	enemySprite.velocityX=-5;
	
	
	
	var rand=Math.round(random(1,2))
	switch(rand){
	  case 1 : enemySprite.addImage(lionImage); 
			   enemySprite.scale= 1;
			   break;
			   
	  case 2: enemySprite.addImage(eagleImage);
			  enemySprite.scale= 1;
			  break;   
			  	  
	  default: break;       
	}
	enemyGroup.add(enemySprite);
	}
	 
}
for(i=0;i<enemyGroup.length;i=i+1){
      
	if(hammerGroup.isTouching(enemyGroup.get(i))){
	  score=score+5;
	  
	  enemyGroup.get(i).destroy();
	  hammerGroup.destroyEach();
  
	      
	}
  }
   
  

	 
function spawnHammer(){
	if(frameCount%30===0){
	hammer=createSprite(200,1000);
	hammer.addImage(hammerImage)
	hammer.scale =0.8;
	hammer.y= manSprite.y;
	hammer.velocityX =10;
	hammerGroup.add(hammer); 
	hammer.lifetime=1000 
	manSprite.depth =hammer.depth;
	manSprite.depth+=1;
	}
}


function reset(){
gameState=PLAY;
gameoverSprite.visible =false;
reloadSprite.visible=false;
manSprite.visible=true;
hammerGroup.destroyEach();
enemyGroup.destroyEach();
score=0;



}
