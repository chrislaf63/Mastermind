import {
    colors,
    elements,
    launchGame,
    displayRules,
    returnGame,
    black,
    red,
    blue,
    green,
    yellow,
    orange,
    white,
    section,
} from "./variables.js";

let inputPlayer = [0, 0, 0, 0];
let toGuess = [];

let colorShippin = null;
let indication0 = 0;
let indication1 = 0;
let indication2 = 0;
let indication3 = 0;
let counter = 0;
let classes = 1;
let indice;
let firstClass;
let secondClass;
let thirdClass;
let fourthClass;
let firstElement;
let secondElement;
let thirdElement;
let fourthElement;

function newElement(tagName, attributes = {}) {
    const element = document.createElement(tagName);
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribute, value);
        }
    }
    return element;
}

function replayGame() {
    let replay = prompt("Rejouer une partie ? (O/N)");
    if (replay == "O" || replay == "o") {
        // for (let i = 0; i < counter; i++){
        //     const cont = document.querySelector(".container")
        //     cont.remove()
        // }
        newGame();
    } else if (replay == "N" || replay == "n") {
        alert("Merci d'avoir joué");
    } else {
        replayGame();
    }
}

function newGame() {
    if (counter !== 0) {
        for (let i = 0; i < counter; i++) {
            const cont = document.querySelector(".container");
            cont.remove();
        }
    }
    inputPlayer = [0, 0, 0, 0];
    colorShippin = null;
    indication0 = 0;
    indication1 = 0;
    indication2 = 0;
    indication3 = 0;
    counter = 0;
    classes = 1;

    gameSelect();
}
function display() {
    indice = `indic${classes}`;
    classes++;
    //     if(counter < 12){
    //     for(let element of elements)
    //     first.classList.remove(element);
    // }

    const container = newElement("div", { class: "container" });
    const row = newElement("div", { class: "row" });
    const indic = newElement("div", { class: `indications ${indice}` });
    const first = newElement("div", { class: "color first" });
    const second = newElement("div", { class: "color second" });
    const third = newElement("div", { class: "color third" });
    const fourth = newElement("div", { class: "color fourth" });
    container.appendChild(row);
    section.appendChild(container);
    row.appendChild(indic);
    row.appendChild(first);
    row.appendChild(second);
    row.appendChild(third);
    row.appendChild(fourth);
    first.addEventListener(
        "click",
        () => {
            rmvClass(first);
            dropColor(first, 0);
            indication0 = indicate(0);
        },
        { once: true }
    );

    second.addEventListener(
        "click",
        function () {
            rmvClass(second);
            dropColor(second, 1);
            indication1 = indicate(1);
        },
        { once: true }
    );

    third.addEventListener(
        "click",
        function () {
            rmvClass(third);
            dropColor(third, 2);
            indication2 = indicate(2);
        },
        { once: true }
    );

    fourth.addEventListener(
        "click",
        function () {
            rmvClass(fourth);
            dropColor(fourth, 3);
            indication3 = indicate(3);
            counter++;
            if (win()) {
                displayIndic();
                replayGame();
            } else if (counter == 12) {
                youLose();
            } else {
                compare();
                setTimeout(() => displayIndic(), 700);
                setTimeout(() => display(), 1500);
            }
        },
        { once: true }
    );
}
function gameSelect() {
    let gameMod;
    gameMod = prompt(
        "Voulez-vous que les couleurs à trouver soient : générées aléatoirement (A) ou manuellement (M)?"
    );
    switch (gameMod) {
        case "a":
            random();
            break;

        case "A":
            random();
            break;

        case "M":
            manual();
            break;

        case "m":
            manual();
            break;

        default:
            gameSelect();
            return;
    }
    return;
}

function random() {
    // MISE A ZERO DU TABLEAU DE REFERENCE
    let randomizer;
    for (let i = 0; i < 4; i++) {
        toGuess.pop();
    }
    // GENERATION DU TABLEAU DE REFERENCE
    toGuess.push(Math.floor(Math.random() * 7));
    console.log(toGuess);
    for (let i = 0; i < 3; i++) {
        // VERIFICATION DE NE PAS AVOIR 2 FOIS LA MEME VALEUR DANS LE TABLEAU
        while (toGuess.includes(randomizer) || randomizer === undefined) {
            randomizer = Math.floor(Math.random() * 7);
        }
        toGuess.push(randomizer);
        console.log(toGuess);
    }
    display();
}

function manual() {
    let input;
    for (let i = 0; i < 4; i++) {
        toGuess.pop();
    }
    for (let i = 1; i <= 4; i++) {
        input = prompt("Entrez la couleur n° " + i) * 1;
        toGuess.push(input);
        switch (input) {
            case "white":
                toGuess.push(1);
                break;

            case "WHITE":
                toGuess.push(1);
                break;
        }
    }
    console.log(toGuess);
    display();
}

function dropColor(cl, p) {
    if (colorShippin === 0) {
        cl.classList.add("white");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 1) {
        cl.classList.add("red");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 2) {
        cl.classList.add("blue");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 3) {
        cl.classList.add("green");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 4) {
        cl.classList.add("yellow");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 5) {
        cl.classList.add("orange");
        inputPlayer.splice(p, 1, colorShippin);
    } else if (colorShippin === 6) {
        cl.classList.add("black");
        inputPlayer.splice(p, 1, colorShippin);
    }
}

function rmvClass(cl) {
    for (let color of colors) {
        cl.classList.remove(color);
    }
}

function compare() {
    if (
        (inputPlayer[0] === toGuess[1] ||
            inputPlayer[0] === toGuess[2] ||
            inputPlayer[0] === toGuess[3]) &&
        toGuess[0] !== inputPlayer[0]
    ) {
        indication0 = 1;
    }
    if (
        (inputPlayer[1] === toGuess[0] ||
            inputPlayer[1] === toGuess[2] ||
            inputPlayer[1] === toGuess[3]) &&
        toGuess[1] !== inputPlayer[1]
    ) {
        indication1 = 1;
    }
    if (
        (inputPlayer[2] === toGuess[0] ||
            inputPlayer[2] === toGuess[1] ||
            inputPlayer[2] === toGuess[3]) &&
        toGuess[2] !== inputPlayer[2]
    ) {
        indication2 = 1;
    }
    if (
        (inputPlayer[3] === toGuess[0] ||
            inputPlayer[3] === toGuess[1] ||
            inputPlayer[3] === toGuess[2]) &&
        toGuess[3] !== inputPlayer[3]
    ) {
        indication3 = 1;
    }
    console.log(
        indication0 + " " + indication1 + " " + indication2 + " " + indication3
    );
}

function indicate(n) {
    let ind;
    if (inputPlayer[n] == toGuess[n]) {
        ind = 2;
    } else {
        ind = 0;
    }
    return ind;
}

function win() {
    if (
        indication0 === 2 &&
        indication1 === 2 &&
        indication2 === 2 &&
        indication3 === 2
    ) {
        alert("Vous avez gagné !!!");
        return true;
    }
    return false;
}

function youLose() {
    alert("vous avez perdu ... Looser !!!");
    replayGame();
}

function displayIndic() {
    const indication = document.querySelector(`.${indice}`);
    const div1 = document.createElement("div");
    if (indication0 === 0) {
        div1.innerText = "_";
        div1.style.backgroundColor = "red";
    } else if (indication0 === 1) {
        div1.innerText = "O";
        div1.style.backgroundColor = "orange";
    } else if (indication0 === 2) {
        div1.innerText = "X";
        div1.style.backgroundColor = "green";
    }
    div1.style.padding = "5px";
    indication.appendChild(div1);

    const div2 = document.createElement("div");
    if (indication1 === 0) {
        div2.innerText = "_";
        div2.style.backgroundColor = "red";
    } else if (indication1 === 1) {
        div2.innerText = "O";
        div2.style.backgroundColor = "orange";
    } else if (indication1 === 2) {
        div2.innerText = "X";
        div2.style.backgroundColor = "green";
    }
    div2.style.padding = "5px";
    indication.appendChild(div2);

    const div3 = document.createElement("div");
    if (indication2 === 0) {
        div3.innerText = "_";
        div3.style.backgroundColor = "red";
    } else if (indication2 === 1) {
        div3.innerText = "O";
        div3.style.backgroundColor = "orange";
    } else if (indication2 === 2) {
        div3.innerText = "X";
        div3.style.backgroundColor = "green";
    }
    div3.style.padding = "5px";
    indication.appendChild(div3);

    const div4 = document.createElement("div");
    if (indication3 === 0) {
        div4.innerText = "_";
        div4.style.backgroundColor = "red";
    } else if (indication3 === 1) {
        div4.innerText = "O";
        div4.style.backgroundColor = "orange";
    } else if (indication3 === 2) {
        div4.innerText = "X";
        div4.style.backgroundColor = "green";
    }
    div4.style.padding = "5px";
    indication.appendChild(div4);
}

displayRules.addEventListener("click", () => {
    document.querySelector(".sect").classList.add("cls");
    document.querySelector(".rules").classList.add("display");
});

returnGame.addEventListener("click", () => {
    document.querySelector(".sect").classList.remove("cls");
    document.querySelector(".rules").classList.remove("display");
});

launchGame.addEventListener("click", newGame);

white.addEventListener("click", function () {
    colorShippin = 0;
    console.log(inputPlayer);
});
red.addEventListener("click", function () {
    colorShippin = 1;
    console.log(inputPlayer);
});
blue.addEventListener("click", function () {
    colorShippin = 2;
    console.log(inputPlayer);
});
green.addEventListener("click", function () {
    colorShippin = 3;
    console.log(inputPlayer);
});
yellow.addEventListener("click", function () {
    colorShippin = 4;
    console.log(inputPlayer);
});
orange.addEventListener("click", function () {
    colorShippin = 5;
    console.log(inputPlayer);
});
black.addEventListener("click", function () {
    colorShippin = 6;
    console.log(inputPlayer);
});
