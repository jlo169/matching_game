
$(document).ready(initializeApp)

function initializeApp() {
    generateGameBoard();
    $('.gameArea').on('click', '.back', cardClicked);
}

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;

var cardArray = [
    'images/babyPug.png',
    'images/layingDown.png',
    'images/leo.jpg',
    'images/potato.png',
    'images/pugSnow.png',
    'images/rainbow.jpg',
    'images/sitting.png',
    'images/sleepyPug.jpg',
    'images/whiteDog.jpg'
];
var cardFaces = cardArray.concat(cardArray)

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
        if (firstCardClicked === secondCardClicked) {
            matchCounter++;
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
            return; 
        }
    }
}