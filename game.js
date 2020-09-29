let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let currentClickNr = 0;

function nextSequence() {
  $("h1").text("Level " + ++level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$("div[type=button]").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (gamePattern[currentClickNr++] == userChosenColour) {
    if (gamePattern.length == currentClickNr) {
      setTimeout(nextSequence, 500);
      currentClickNr = 0;
    }
  } else {
    $("h1").text("Game over! Press any key to restart");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 100);

    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    currentClickNr = 0;
  }
});

function playSound(name) {
  let buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("div[id=" + currentColour + "]").addClass("pressed");
  setTimeout(() => {
    $("div[id=" + currentColour + "]").removeClass("pressed");
  }, 100);
}

document.addEventListener("keydown", function () {
  if (level == 0 || $("h1").text() == "Game over! Press any key to restart") {
    nextSequence();
  }
});
