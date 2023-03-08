const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer ="X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents ="all";
        box.classList= `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player ${currentPlayer}`;
    
}

initGame();

function swapTurn(){
    if(currentPlayer === "X") {
        currentPlayer = "O" ;
        
    }
    else {
        currentPlayer = "X" ;
        
    }
    gameInfo.innerText =`Current Player ${currentPlayer}`;
}


function checkGameOver(){
    let answer= "";
    winningPositions.forEach((position)=>{//all 3 positon should be equal and non empty
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
        && 
        ((gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) ){
           
            if(gameGrid[position[0]==="X"])
                answer="X";
            else{
                answer="O";
            }

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameInfo.innerText = `Winner ${answer}`;
        newGameBtn.classList.add("active");
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
            newGameBtn.classList.add("active");
        })
    }

    let fillcount=0;

    gameGrid.forEach((box)=>{
        if(box!=="")
        fillcount++;
    });

    if(fillcount === 9){
        gameInfo.innerText = `Game Tied`;  
    }
}

function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer;//for ui
        gameGrid[index] = currentPlayer;//for inner logic
        boxes[index].style.pointerEvents ="none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index)=>{//index gives the index at which box
    box.addEventListener("click", ()=>{
        handleClick(index);
    })

});

newGameBtn.addEventListener("click", initGame);