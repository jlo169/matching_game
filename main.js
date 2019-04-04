$(document).ready(initializeApp)

function initializeApp() {
    $('.cardContainer').on('click', '.back', cardClicked);

}

var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 2;
var matchCounter = 0;

$('.gameArea').on('click', '.back', cardClicked)

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