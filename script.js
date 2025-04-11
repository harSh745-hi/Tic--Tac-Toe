const boxes = document.querySelectorAll(".box");
const game = document.querySelector(".game-info");
const newButton = document.querySelector(".btn");


 let currentPlayer ;
 let gameGrid;

 const winPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];


 function initialize() {
    currentPlayer ="x";
    gameGrid=["","","","","","","","",""];
    

    //  ui la empty krne new game sathi 

  boxes.forEach((box,index) => {
    box.innerText ="";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index+1}`;

  }) 
    newButton.classList.remove("active");
    game.innerText=`current player - ${currentPlayer}`;
 
  




 }
    
 initialize();


function swapTurn(){
  
     if(currentPlayer === "x"){
         currentPlayer = "o";
     }
     else{
        currentPlayer = "x";
     }

    //  ui update  

    game.innerText = `Current Player - ${currentPlayer}`;
 

}

function checkWin (){
    
    let answer ="";

    winPosition.forEach((position) => {

        // all boxes should not be an empty and equal value 
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid [position[2]] !== "" ) 
          && (gameGrid[position[0]] === gameGrid[position[1]]) &&  (  gameGrid [position[1]] === gameGrid[position[2]]))
        {
              
            //   check if x win 
            if(gameGrid[position[0]] === "x")
                answer = "x";
            
            else 
                answer ="o";
            
        // disable pinter Event 
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        //   winnner x or o 

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        }
    }) ;




//    it means we have an answer 
if(answer !== ""){
    game.innerText=`winner Player ${answer}`;
    newButton.classList.add("active");
    return;

}

// lets check  there it is tie 
let fillCount = 0;
 gameGrid.forEach((box) => {
    if(box  !== "")
        fillCount++;
 });

//  board  is  filled 
if(fillCount === 9)
    game.innerText="its a Tie ";
    
    newButton.classList.add("active");
}


 function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer; 
        boxes[index].style.pointerEvents =  "none";
        // swap current player 
        swapTurn();
        // who wins the game 
        checkWin();


    } 
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);  
    })
});


newButton.addEventListener("click", initialize);


 
