$(document).ready(initializeApp)

function initializeApp() {
    generateGameBoard();
    $('.cardContainer').on('click', '.back', cardClicked);

}
var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;

var cardArray = [
    images/babyPug.png,
    images/layingDown.png,
    images/leo.jpg,
    images/potato.png,
    images/pugSnow.png,
    images/rainbow.jpg,
    images/sitting.png,
    images/sleepyPug.jpg,
    images/whiteDog.jpg
];

function generateGameBoard() {
    for (var rowNum = 1; rowNum <=3; rowNum++) {
        var makeRow = $('<div>').addClass('row' + rowNum);
        for (var i = 1; i <= 6; i++) {
            var makeCardContainer = $('<div>').addClass('cardContainer');
            var makeCard = $('<div>').addClass('card');
            var makeFront = $('<div>').addClass('front');
            var makeBack = $('<div>').addClass('back');

            makeCard.append(makeFront, makeBack);
            makeCardContainer.append(makeCard);
            makeRow.append(makeCardContainer);
           
        }
        $('.gameArea').append(makeRow)
    }
}

function cardClicked() {
    // console.log(this)
    // console.log($(this).prev().find('img').attr('src'))
    // console.log(e)
    if ($(this).hasClass('flipped'))
    $(this).toggle().addClass('flipped');
    if (firstCardClicked === null) {
        return firstCardClicked = $(this).prev().find('img').attr('src');
    } else if (secondCardClicked === null) {
        secondCardClicked = $(this).prev().find('img').attr('src');
        if (firstCardClicked === secondCardClicked) {
            matchCounter++;
            firstCardClicked = null;
            secondCardClicked = null;

            if (matchCounter === totalPossibleMatches) {
                $('.title').text('win');
            }
            return;
        } else {
            setTimeout(function() {
                console.log('timing out');
                $('.flipped').toggle();
                $('.back').removeClass('flipped');
                firstCardClicked = null;
                secondCardClicked = null;
            }, 2000);
            return; 
        }
    }
}