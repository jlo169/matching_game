
$(document).ready(initializeApp)

function initializeApp() {
    generateGameBoard();
    // runPuglieRun();
    $('.gameArea').on('click', '.back', cardClicked);
    $('.gameArea').on('click', '.reset', resetEverything);
}

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var gamesPlayed = 0;
var matchCounter = 0;
var matchAttempts = 0;
var matchAccuracy = 0; 
var matchPlayed = 0;

var cardArray = [
    'images/babyPug.png',
    'images/layingDown.png',
    'images/leo.jpg',
    'images/potato.png',
    'images/pugSnow.png',
    'images/rainbow.jpg',
    'images/sitting.png',
    'images/sleepyPug.jpg',
    'images/whiteDog.jpg',
    'images/blackPug.jpg',
    'images/grumble.jpg',
    'images/princess.jpg',
    'images/quizzical.jpg'
];

var cardFaces = makeCardArray(cardArray);

function makeCardArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    var newArray = arr.slice(0, 9);
    return newArray.concat(newArray);
}




function generateGameBoard() {

    for (var rowNum = 1; rowNum <=3; rowNum++) {
        var makeRow = $('<div>').addClass('row' + rowNum);
        for (var i = 1; i <= 6; i++) {
            var makeCardContainer = $('<div>').addClass('cardContainer');
            var makeCard = $('<div>').addClass('card');
            var makeFront = $('<div>').addClass('front');
            var makeBack = $('<div>').addClass('back');

            var randomCardIndex = Math.floor(Math.random() * cardFaces.length);
            var cardFront = $('<img>').attr('src', cardFaces[randomCardIndex]);
            cardFaces.splice(randomCardIndex, 1);

            makeFront.append(cardFront);
            makeCard.append(makeFront, makeBack);
            makeCardContainer.append(makeCard);
            makeRow.append(makeCardContainer);
        }
        $('.gameArea').append(makeRow)
    }
    var makeResetButton = $('<button>').addClass('reset').text('Reset');
    $('.gameArea').append(makeResetButton);
}

function matchingAccuracy() {
    matchAccuracy = Math.floor(matchCounter / matchAttempts * 100);
    $('.accuracy').text(`Accuracy ${matchAccuracy}%`);
}

function cardClicked() {
    if ($(this).hasClass('flipped')) {
        return;
    }
    $(this).toggle().addClass('flipped');

    if (firstCardClicked === null) {
        return firstCardClicked = $(this).prev().find('img').attr('src');

    } else if (secondCardClicked === null) {
        secondCardClicked = $(this).prev().find('img').attr('src');
        $('.attempts').text(`Attempts ${++matchAttempts}`);
        if (firstCardClicked === secondCardClicked) {
            matchCounter++;
            matchingAccuracy();
            firstCardClicked = null;
            secondCardClicked = null;
            $('.flipped').removeClass('flipped back').prev().find('img').addClass('faded')

            if (matchCounter === totalPossibleMatches) {
                $('.title').text('win');
            }
            return;
        } else {
            $('.gameArea').off('click', '.back', cardClicked);
            setTimeout(function() {
                $('.flipped').toggle().removeClass('flipped');
                firstCardClicked = null;
                secondCardClicked = null;
                $('.gameArea').on('click', '.back', cardClicked);
            }, 1000);
            matchingAccuracy();
            return; 
        }
    }
}

function resetEverything() {
    gamesPlayed = 0;
    matchCounter = 0;
    matchAttempts = 0;
    matchAccuracy = 0; 
    $('.attempts').text(`Attempts 0`);
    $('.accuracy').text(`Accuracy 0%`);
    $('.gameArea').empty();
    cardFaces = makeCardArray(cardArray);
    generateGameBoard();
}


function runPuglieRun() {
    var makePuglie = $('div').addClass('puglie');
    $('.gameArea').append(makePuglie);
}

