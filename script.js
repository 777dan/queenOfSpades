"use strict";
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let drawnCards = [];
const methods = [takeFromEnd, takeFromMid, takeFromBeg];

function shuffle(arr) {
    let rand, temp;
    for (let i = 0; i < arr.length; i++) {
        rand = Math.floor(Math.random() * (i + 1));
        temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function play(cards) {
    // let card = "";
    console.log(shuffle(cards));
    aiPlay()

    // while (cards.length > 0) {
    //     // alert("Your turn!");
    //     // if (showCard(card, "You won")) {
    //     //     return;
    //     // }

    //     alert("My turn!");
    //     let randomMethod = Math.floor(Math.random() * methods.length);
    //     methods[randomMethod]("I won");
    //     alert("Your turn!");
    //     // if (showCard(card, "I won")) {
    //     //     return;
    //     // }
    // }
}

function aiPlay() {
    alert("My turn!");
    let randomMethod = Math.floor(Math.random() * methods.length);
    if (methods[randomMethod]("I won")) {
        return;
    } else {
        alert("Your turn!");
    }
}

let counter = 0;
// function showCard(card, win) {
//     alert((card = cards.pop()));
//     drawnCards[counter++] = card;
//     if (card === "Q") {
//         alert(win);
//         console.log(drawnCards);
//         return true;
//     }
// }

function showCard(card, win) {
    // alert((card = cards.pop()));
    // drawnCards[counter++] = card;
    alert(card);
    drawnCards[counter++] = card;
    if (card === "Q") {
        alert(win);
        console.log(drawnCards);
        return true;
    }
    else if (win === "You won") {
        aiPlay();
    }
}

function start() {
    play(cards);
}

function takeFromEnd(win = "You won") {
    let card = cards.pop()
    // alert(card);
    // drawnCards[counter++] = card;
    return showCard(card, win);
}

function takeFromMid(win = "You won") {
    let card = cards.splice(Math.round(cards.length / 2), 1)
    // alert(card);
    // drawnCards[counter++] = card;
    return showCard(card, win);
}

function takeFromBeg(win = "You won") {
    let card = cards.shift()
    // alert(card);
    // drawnCards[counter++] = card;
    return showCard(card, win);
}

// const fruits = ["Banana"];

// // At position 2, remove 2 items:
// fruits.splice(Math.round(fruits.length / 2), 1);

// document.getElementById("demo").innerHTML = fruits;