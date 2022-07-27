 let board = document.getElementById('board');
 let inputDr = {x:0, y:0};
 let score = 0;
 let speed = 9;
 let lastPaintTime = 0;
 let snakeArray = [
    {x:13, y:12}
 ];

 let food = {x:5 , y:10};
 let a = 2;
 let b = 18;
 let eatSound =  new Audio ('./music/eat-sound.mp3');
 let gameOverMusic = new Audio ('./music/gameover.mp3');
 let bgMusic = new Audio('./music/music.mp3');
  let scoreBoard = document.getElementById('scoreboard');
  let gameEnd = document.getElementById('game-over');
  let restart = document.getElementById('restart');
  let yourScore = document.getElementById('your-score');


 // ------------------------------function & logic for game ----------------------------------


function main(cTime){
    window.requestAnimationFrame(main);
    if((cTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = cTime;
    

    mainGaming();
}

// -----------------------------------------------colllapse fuction----------------------------
function iscollapse (srr){
  for (let i = 1; i < snakeArray.length; i++) {
   if(snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y){
    return true;
   }  
  }
  if(snakeArray[0].x >= 20 || snakeArray[0].x <= 0 || snakeArray[0].y <= 0 || snakeArray[0].y >= 20 ){
    return true;
  }
}
    
// ---------------------------------------------------main-gaming-function--------------------------
function mainGaming(){
    // update food and snakebody
    if(iscollapse(snakeArray)){
       gameEnd.style.display = 'block'
       inputDr = { x:0, y:0 };
       snakeArray = [{x:13, y:12}];
       food ={x:5 , y:10};
       gameOverMusic.play();
       restart.addEventListener('click', e => {
        gameEnd.style.display = 'none';
        score = 0;
      })
    }

    // on food taken
  if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
    snakeArray.unshift({x : snakeArray[0].x + inputDr.x, y : snakeArray[0].y + inputDr.y});
    food = {
        x : Math.round( a + (b-a)*Math.random()),
        y : Math.round( a + (b-a)*Math.random())
    };
    eatSound.play();
    score += 1;
  }

  // ------------------score--count---------------------------

  scoreBoard.innerHTML = "score :" + '  ' + score;
  yourScore.innerHTML = "score :"  + '  ' + score;


  //movement

  for (let i = snakeArray.length -2; i >= 0; i--) {
    
    snakeArray[i+1] ={...snakeArray[i]};
  }
  snakeArray[0].x += inputDr.x;
  snakeArray[0].y += inputDr.y;

    // display snake 

    board.innerHTML= "";
    snakeArray.forEach((e, index) => {
        let  snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;
        if(index === 0){
        snakeElement.classList.add('snake-head');
        }
        else{
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    })
    let  foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food')
       board.appendChild(foodElement); 
  
}


   window.requestAnimationFrame(main);
   window.addEventListener('keydown', e => {
   
     inputDr = {x:0, y:1};
        switch (e.key) {
            case "ArrowUp" : 
            inputDr.x= 0;
            inputDr.y = -1;
            break;

            case "ArrowDown" : 
            inputDr.x= 0;
            inputDr.y = 1;
            break;

            case "ArrowLeft" : 
            inputDr.x= -1;
            inputDr.y = 0;           
            break;

            case "ArrowRight" :
                inputDr.x= 1;
            inputDr.y = 0; 
              
            break;
        }
   })