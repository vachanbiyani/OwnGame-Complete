


var gameState;
var score = 0;
var hero,ground;
var obstacle_img1,obstacle_img2,obstacle_img3,obstacle_img4;
var enemy1,enemy2,enemyHead;
var hero1_img,hero2_img,enemy1_img,enemy2_img,enemyHead_img;
var obstaclesGroup,enemyGroup;
var bullets,bulletsGroup,gamerOver_img;
var ground_img,bullets;

var bg;
function preload(){

    obstacle_img1=loadImage("images/ob1.png");
    obstacle_img2=loadImage("images/ob5.png");
    obstacle_img3=loadImage("images/ob3.png");
    obstacle_img4=loadImage("images/ob4.png");

    enemy1_img=loadImage("images/enemy1.png");
    enemy2_img=loadImage("images/enemy2.png");
    enemyHead_img=loadImage("images/enemyHead.png");

    hero1_img=loadImage("images/hero1.png");
    hero2_img=loadImage("images/hero2.png");

    gameOver_img=loadImage("images/gameover.jpg");

    bg=loadImage("images/bg.png");
    gm=loadImage("images/gameover.jpg");



}

function setup(){

    createCanvas(displayWidth,displayHeight-150);
   
    ground = createSprite(displayWidth/2,760,displayWidth,10);
    ground.visible=false;

    hero = createSprite(100,500,40,80);
    hero.addImage("hero",hero1_img);
    hero.scale=0.4
    hero.visible = false;
    hero.collide(ground);

    gameState="STORY";

    obstaclesGroup=new Group();
    enemyGroup=new Group();
    bulletsGroup=new Group();

    //score=0;

}

function draw(){
    background(180);
   
 x=100;
  if(gameState==="STORY"){

        textSize(30)
        text("YOU ARE THE HERO OF YOUR CITY",400,x);
        text("BUT YOUR CITY IS IN DANGER" ,400,x+40);
        text("ALIENS HAVE INVADED YOUR CITY ",400,x+80);
        text("YOUR ARE THE LAST HOPE OF YOUR CITY",400,x+120);
        text("SAVE YOUR CITY BY KILLING ALL ALIENS" ,400,x+160);
        text("YOUR ABILITY INCREASES AS YOU KILL YOUR ENEMIES",400,x+200);

        text("GOOD LUCK",400,displayHeight-220); 
        text("PRESS A TO START THE GAME",400,displayHeight-170);

        if(keyDown("a")){
            gameState="PLAY";
        }
    }

     if(gameState==="PLAY"){

      image(bg,0,0,displayWidth,displayHeight)

      hero.visible=true;
      hero.velocityY = 0;
     

        if(keyDown("UP_ARROW") ) {
            hero.velocityY = -14;
          }
          if(keyDown("DOWN_ARROW") ) {
            hero.velocityY = +14;
          }        

          if(keyDown("s")){
            spawnBullets();
          }


         /* if(frameCount% 50===0){
            obstacles4();
          }
          if(frameCount% 50===0){
            obstacles3();
          }
          if(frameCount% 50===0){
            obstacles2();
          }
          if(frameCount% 50===0){
            obstacles1();
          }*/
for(var i =0;i<enemyGroup.length;i++){
          if(enemyGroup.get(i).isTouching(bulletsGroup)){
            enemyGroup.get(i).destroy();
            bulletsGroup.destroyEach();
          }
}
        

          if(obstaclesGroup.isTouching(hero)||enemyGroup.isTouching(hero)){
              gameState="END";
         }

       spawnObstacles();
       spawnEnemy();
       
     }
    
     if(gameState==="END"){

        /*hero.velocityX=0;
        hero.velocityY=0;

        var gameOver=createSprite(displayWidth/2,displayHeight/2)
      gameOver.addImage("gameOver_img");*/
      clear();
     // image(gamerOver_img,400,400,400,400)
     obstaclesGroup.destroyEach();
     enemyGroup.destroyEach();
     hero.destroy();
     bulletsGroup.destroyEach();
     ground.destroy();

     image(gm,0,0,displayWidth,displayHeight)

     }
     console.log(displayHeight);

     


    drawSprites();
}


function spawnObstacles() {
    if(frameCount % 100 === 0) {
      //note obstacle.x
      var obstacle = createSprite(displayWidth,690,10,40);
      obstacle.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(obstacle_img1);
                break;
        case 2: obstacle.addImage(obstacle_img2);
                break;
        case 3: obstacle.addImage(obstacle_img3);
                break;
        case 4: obstacle.addImage(obstacle_img4);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 1;
      //note obstacle.lifetime
      obstacle.lifetime = displayWidth/hero.velocityX+30;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }


/*function obstacles1(){
  obstacle1=createSprite(displayWidth,690);
  obstacle1.addImage("ob1",obstacle_img1);
  obstacle1.velocityX=-10;
 }

 function obstacles2(){
  obstacle2=createSprite(displayWidth+200,100);
  obstacle2.addImage("ob2",obstacle_img2);
  obstacle2.velocityX=-10;
 }

 function obstacles3(){
  obstacle3=createSprite(displayWidth-100,730);
  obstacle3.addImage("ob3",obstacle_img3);
  obstacle3.velocityX=-10;
 }

 function obstacles4(){
  obstacle4=createSprite(displayWidth,730);
  obstacle4.addImage("ob4",obstacle_img4);
  obstacle4.velocityX=-10;
 }*/
  function spawnEnemy() {
    if(frameCount % 160 === 0) {
      //note obstacle.x
      var enemy = createSprite(displayWidth,random(100,200),10,40);
      enemy.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: enemy.addImage(enemy1_img);
                break;
        case 2: enemy.addImage(enemy2_img);
                break;
        case 3:enemy.addImage(enemyHead_img);
        console.log("error")
        break;
        default: break;
      }
           
      enemy.scale = 0.8;
     // enemy.velocityX=-5;
      enemy.lifetime = displayWidth/4+30;
      enemyGroup.add(enemy);
    }
     
  }

function spawnBullets(){

  bullets=createSprite(hero.x,hero.y,20,2);
  bullets.velocityX=10;

  bulletsGroup.add(bullets);
}


