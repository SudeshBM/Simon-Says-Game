let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Step1: start the game by pressing any button
document.addEventListener("keypress", function () {
    if(started == false){
        console.log("game is started");  
        started = true;

        levelUp();
    }
});

//Step2 : buttonflash and levelUp
//(1)gameflash button
function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function (){
    btn.classList.remove("gameflash");
  },250);
}
//Step3 :(3)Button eventListener userflash button
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function (){
    btn.classList.remove("userflash");
  },250);
}  

//Step2 :(2)levelUp
function levelUp() {
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);

    //Step4 : Matching sequence(adding randColor inside gameSeq)
    gameSeq.push(randColor);
    console.log(gameSeq);
}

function checkAns(idx){
  if(userSeq[idx]===gameSeq[idx]){
   if(userSeq.length==gameSeq.length){
    setTimeout(levelUp,1000);
   }
  }else{
    h2.innerHTML = `Game Over! Your score was <b>${level}<b><br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    },150)
    reset();
  }
}

//Step3 :(2)Button eventListener-btnPress function
function btnPress(){
  let btn = this;
  userFlash(btn);

  //Step4 : Matching sequence(adding userColor inside userSeq)
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
}

//Step3 :(1)Button eventListener
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
  btn.addEventListener("click",btnPress);
}

//Step5 : Reset the game after error
function reset () {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}