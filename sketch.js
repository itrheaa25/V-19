var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var boyRunning,boyRunningImg;
var boyJump , boyJumpImg;
var boyLand, boyLandImg;
var ground, groundImg;
var invisibleGround;


var friend, friendImg;
var foe, foeImg;
var checkPointSound;

var gameOver,gameOverImg;
var restart, restartImg;

var foeGroup, friendGroup;

var score = 0;

function preload(){
  groundImg = loadImage("12 bg.jpg");
  boyRunningImg = loadImage("boy1.jpeg");
  friendImg = loadImage("friend.jpg");
  foeImg = loadImage("foe.jpg");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

 

}
function setup(){
createCanvas(1000,550)

ground = createSprite(500,275,1000,550);
ground.addImage(groundImg);
ground.scale = 1.5; 

invisibleGround = createSprite(500,520,1000,20);
invisibleGround.visible = false;

boy = createSprite(60,300,15,15);
boy.addImage(boyRunningImg);
boy.scale = 0.3;


foeGroup = new Group();
friendGroup = new Group();

gameOver = createSprite(300,100);
gameOver.scale = 0.5;
gameOver.addImage(gameOverImg)


restart = createSprite(300,140);
restart.scale = 0.5;
restart.addImage(restartImg);


}
function draw(){

    if(gameState === PLAY){

        gameOver.visible = false;
        restart.visible = false;
        
       // ground.velocityX = -(4 + 3* score/100)
        //scoring
        score = score + Math.round(getFrameRate()/60);
        
       

        
        //jump when the space key is pressed
        if(keyDown("space")&& boy.y >= 150) {
            boy.velocityY = -12;
          
        }
        
        //add gravity
        boy.velocityY = boy.velocityY + 0.8
      
        
        
        if(foeGroup.isTouching(boy)){
            
            gameState = END;
           
          
        }
      }
       else if (gameState === END) {
          gameOver.visible = true;
          restart.visible = true;
         
        
        
         
         
          ground.velocityX = 0;
          boy.velocityY = 0
          
         
          //set lifetime of the game objects so that they are never destroyed
      
         
         
         
         if(score>HI){
            HI=score;
            }
         
       }
      
     
      //stop trex from falling down
      boy.collide(invisibleGround);
      
      if(mousePressedOver(restart)) {
          reset();
        }

        good();
        bad();
    
      drawSprites();

      text("Score = ",900,100);
    
    }
    function reset(){
        gameState = PLAY;
        
        gameOver.visible = false;
        restart.visible = false;
        
        foeGroup.destroyEach();
        friendGroup.destroyEach();
        
        score = 0;
        boy.changeAnimation("running",boyJump);
        
      
      }

function good(){
  if(frameCount% 150 === 0){
    friend = createSprite(300,Math.round(random(300,450)),20,20);
    friend.addImage(friendImg);
    friend.velocityX = -5;
    friend.scale = 0.1;
 friendGroup.add(friend);
  }
  
}

function bad(){
  if(frameCount% 70 === 0){
    foe = createSprite(300,Math.round(random(300,450)),20,20);
    foe.addImage(foeImg);
    foe.velocityX = -5;
    foe.scale = 0.1;
  foeGroup.add(foe)

  }
  
}


	
