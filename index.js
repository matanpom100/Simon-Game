let colorsArr = ["yellow", "green", "red", "blue"]
let gamePattern = [];

let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong")
        $("#level-title").text("Game Over!");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 1000);
        $("#level-title").text("Press A Key to restart");
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColor = colorsArr[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);

}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass('pressed')
    }, 100);

}
function playSound(name) {
    let audio = new Audio(name + ".mp3");
    audio.play();
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = 0;
}






// $(".btn").click(nextSequence);

