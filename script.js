"use strict";

let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let playedCards = [];

let number = 0;
let isGame = true;
let turn = 0;
const cardsField = document.getElementById("cards");
const realCardsField = document.getElementById("real_cards");
const playedCardsField = document.getElementById("played_cards");
const rel = document.getElementById("reload");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");

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

shuffle(cards);

// cardsField.innerHTML = cards;

const playSound = (sound) => {
    const song = document.getElementById(sound);
    song.volume = 1;
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

function allowDrop(event) {
    if (isGame === true && turn === 0) {
        event.preventDefault();
    }
}

function drag(event) {
    if (isGame === true && turn === 0) {
        event.dataTransfer.setData("text", event.target.id);
        playSound('sound1');
    }
}

function drop(event) {
    if (isGame === true && turn === 0) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        playSound('sound2');

        event.target.appendChild(document.getElementById(data));
        document.getElementById(data).classList = 'card usedCard';
        play(data);
    }
}

function showCards(cards) {
    return cards.join(", ");
}

function newPlay() {
    location.reload();
    return false;
}

function play(elId) {
    if (!isGame) return;
    if (myMove(elId)) return;
    setTimeout(computerMove, 300);
}

function removeCard(number) {
    playedCards.push(cards[number]);
    cards.splice(number, 1);
    // cardsField.innerHTML = cards;
    generateCards(playedCards, playedCardsField, "p", "usedCard");
    generateCards(cards, realCardsField, "", "notUsedCard");
    addEventCardList();
}

const showModal = (player) => {
    modalContent.children[0].textContent = `${player} won!`;
    if (player === "I") {
        modalContent.style.backgroundColor = 'lightcoral';
    } else if (player === "You") {
        modalContent.style.backgroundColor = 'lightgreen';
    }
    modal.style.opacity = "1";
    modal.style.zIndex = "1";
    setTimeout(() => {
        modal.style.opacity = "0";
        modal.style.zIndex = "-1";
    }, 3000);
}

const checkWin = (card) => card === "Q";

const animateCards = () => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(cardEl => {
        cardEl.classList.add('rotate');
        cardEl.classList.add('effect');
        cardEl.classList.add('move');
    });
}

function myMove(elId) {
    if (turn === 0) {
        isGame = false;
        let b = false;
        number = Number(elId.substr(3));
        if (number > cards.length || number < 0) {
            throw new Error("Input error! Try again!");
        }
        setTimeout(removeCard.bind(this, number), 200);
        turn = 1;
        if (checkWin(cards[number])) {
            playSound('sound3');
            b = true;
            setTimeout(animateCards, 1000);
            showModal('You');
        } else {
            isGame = true;
        }
        return b;
    }
}

function computerMove() {
    if (turn === 1) {
        isGame = false;
        let b = false;
        number = Math.floor(Math.random() * cards.length);
        // let computerCard = document.getElementById(`rc_${number}`);
        setTimeout(removeCard.bind(this, number), 200);
        turn = 0;
        if (checkWin(cards[number])) {
            playSound('sound4');
            b = true;
            setTimeout(animateCards, 1000);
            showModal('I');
        } else {
            isGame = true;
        }
        return b;
    }
}

function generateCards(cards, cardsF, s, bgClass) {
    cardsF.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        cardsF.innerHTML += `<div id="rc_${i}${s}" class="card ${bgClass}" draggable="true" ondragstart="drag(event)"><span>${cards[i]}</span></div>`;
    }
}

function addEventCardList() {
    let card_elements = document.getElementsByClassName("card");
    for (let i = 0; i < card_elements.length; i++) {
        card_elements[i].addEventListener("click", play);
    }
}

window.onload = function () {
    generateCards(cards, realCardsField, "", "notUsedCard");
    addEventCardList();
    rel.addEventListener("click", newPlay);
};