let toGuess = [];
let playerInput = [];
const white = 0;
const red = 1;
const blue = 2;
const green = 3;
const yellow = 4;
const orange = 5;
const black = 6;
let indication1 = "";
let indication2 = "";
let indication3 = "";
let indication4 = "";
let counter = 12



function generate(){
    counter = 12;
    let randomNumber;
    for(i = 0; i < 4; i++){
        toGuess.pop();
    }
    for(i = 0; i < 4; i++){
        randomNumber = Math.floor(Math.random() * 7);
        toGuess.push(randomNumber);
    }

}

function input(){
    let inputColor;
    for(i = 0; i < 4; i++){
        playerInput.pop();
    }
    
    for(i = 1; i < 5; i++){
        inputColor = prompt('Entrez la couleur n°' + i)*1;
        playerInput.push(inputColor);
    }
    console.log(playerInput);
    compare();
}

function compare(){
    while(counter > 0){
        for(i = 1; i <= 3; i++){
            if(toGuess[0] === playerInput[i]){
                indication1 = "O";
            } else {
                indication1 = " ";
            }
        }

        if((toGuess[1] === playerInput[0] || toGuess[1] === playerInput[2] || toGuess[1] === playerInput[3]) && (toGuess[1] !== playerInput[1])){
            indication2 = "O";
        } else {
            indication2 = " ";
        }

        if((toGuess[2] === playerInput[0] || toGuess[2] === playerInput[1] || toGuess[2] === playerInput[3]) && (toGuess[2] !== playerInput[2])){
            indication3 = "O";
        } else {
            indication3 = " ";
        }
        
        if((toGuess[3] === playerInput[0] || toGuess[3] === playerInput[1] || toGuess[3] === playerInput[2]) && (toGuess[3] !== playerInput[3])){
            indication4 = "O";
        } else {
            indication4 = " ";
        }

        if(toGuess[0] === playerInput[0]){
            indication1 = "X";
        }
        if(toGuess[1] === playerInput[1]){
            indication2 = "X";
        }
        if(toGuess[2] === playerInput[2]){
            indication3 = "X";
        }
        if(toGuess[3] === playerInput[3]){
            indication4 = "X";
        }

        console.log(indication1 + indication2 + indication3 + indication4)
        if(indication1 === "X" && indication2 === "X" && indication3 === "X" && indication4 === "X"){
            alert('Vous avez gagné !!!');
            replayGame();
            return
        } else {
            counter--;
        }
        input();
    }
    alert('Vous avez perdu !!! La combinaison était ' + toGuess);
    replayGame();
    return;
}


function replayGame(){
    let replay;
    replay = prompt('Rejouer ? (O/N)');

    switch(replay){
        case 'O' :
            generate();
            break;

        case 'o' :
            generate();
            break;

        case 'N' :
            alert('Merci d\'avoir joué !');
            return;
            
        case 'n' :
            alert('Merci d\'avoir joué !');
            return;

        default : 
            replayGame();
            break;
    }
}
generate();
console.log(toGuess);
input();


