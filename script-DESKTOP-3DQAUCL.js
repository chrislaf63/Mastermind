document.addEventListener("DOMContentLoaded", function () {
    const black = document.querySelector(".black");
    const red = document.querySelector('.red');
    const blue = document.querySelector('.blue');
    const green = document.querySelector('.green');
    const yellow = document.querySelector('.yellow');
    const orange = document.querySelector('.orange');
    const white = document.querySelector('.white');
    const first = document.querySelector(".first");
    const second = document.querySelector(".second");
    const third = document.querySelector(".third");
    const fourth = document.querySelector(".fourth");
    let colorShippin = null;
    let toGuess = []
    let inputPlayer = [0, 0, 0, 0];
    const colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'black'];
    
    function random(){
        for (i = 0; i < 4; i++){
            toGuess.pop();
        }
        for (i = 0; i < 4; i++){
            toGuess.push(Math.floor(Math.random()*7));
        }
        console.log(toGuess);
    }

    function manual(){
        let input;
        for (i = 0; i < 4; i++){
            toGuess.pop();
        }
        for(i = 1; i <= 4; i++){
            input = prompt('Entrez la couleur n° ' + i)*1;
            toGuess.push(input);
        }
        console.log(toGuess);
    }
    
    function gameSelect() {
        let gameMod;
        gameMod = prompt('Voulez-vous que les couleurs à trouver soient : générées aléatoirement (A) ou manuellement (M)?')
        switch(gameMod) {
            case 'a' :
                random(); 
                break;

            case 'A' :
                random();
                break;

            case 'M' :
                manual();
                break;

            case 'm' :
                manual();
                break;

            default :
            gameSelect();
            return;
        }
    }

    function dropColor(cl, p){
        if(colorShippin === 0){
            cl.classList.add('white');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 1){
            cl.classList.add('red');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 2){
            cl.classList.add('blue');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 3){
            cl.classList.add('green');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 4){
            cl.classList.add('yellow');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 5){
            cl.classList.add('orange');
            inputPlayer.splice(p, 1, colorShippin);
        } else if(colorShippin === 6){
            cl.classList.add('black');
            inputPlayer.splice(p, 1, colorShippin);
        }
    }

        function rmvClass(cl) {
            
            for(let color of colors){
            cl.classList.remove(color);
        }
    }
        
    white.addEventListener('click', function() {colorShippin = 0; console.log(inputPlayer);});
    red.addEventListener('click', function() {colorShippin = 1; console.log(inputPlayer);})
    blue.addEventListener('click', function() {colorShippin = 2; console.log(inputPlayer);})
    green.addEventListener('click', function() {colorShippin = 3; console.log(inputPlayer);})
    yellow.addEventListener('click', function() {colorShippin = 4; console.log(inputPlayer);})
    orange.addEventListener('click', function() {colorShippin = 5; console.log(inputPlayer);})
    black.addEventListener('click', function() {colorShippin = 6; console.log(inputPlayer);})
   
    
    

    first.addEventListener('click', function() { 
        rmvClass(first);
        dropColor(first, 0);
    });

    second.addEventListener('click', function() { 
        rmvClass(second);
        dropColor(second, 1);
    });

    third.addEventListener('click', function() { 
        rmvClass(third);
        dropColor(third, 2);
    })

    fourth.addEventListener('click', function() { 
        rmvClass(fourth);
        dropColor(fourth, 3);
    })
    
    gameSelect();
});
