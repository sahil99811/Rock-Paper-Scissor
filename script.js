// Initialize the game
let youPicked, computerPicked;
const computerChoices = ["rock", "paper", "scissor"];
let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

//background colour selection dynamically
const backgroundColour={
    "rock":"#0074B6",
    "paper":"#FFA943",
    "scissor":"#BD00FF"
}
// Function to get a random choice for the computer
function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * computerChoices.length);
    return computerChoices[randomIndex];
}

// Function to update scores in the UI and localStorage
function updateScores() {
    $("#your-score").text(yourScore);
    $("#computer-score").text(computerScore);
    localStorage.setItem('yourScore', yourScore);
    localStorage.setItem('computerScore', computerScore);
}

// Function to handle the game outcome
function handleGameOutcome() {
    $(".you-pickedBox").removeClass("animation");
    $(".pc-pickedBox").removeClass("animation");
    $(".winning-option").css("display", "flex");
    $(".next-button").css("display", "block");
    $('.you-pickedBox').css("border-color", backgroundColour[youPicked]);
    $(".pc-pickedBox").css("border-color", backgroundColour[computerPicked]);
    $(".you-pickedBox img").attr("src", `./assets/${youPicked}.png`);
    $(".pc-pickedBox img").attr("src", `./assets/${computerPicked}.png`);

    if ((youPicked == "scissor" && computerPicked == "paper") ||
        (youPicked == "paper" && computerPicked == "rock") ||
        (youPicked == 'rock' && computerPicked == 'scissor')) {
        $(".winningMessage").text("YOU WIN");
        $(".play-again").text("Play Again");
        $(".you-pickedBox").addClass("animation");
        yourScore += 1;
    } else if (youPicked == computerPicked) {
        $(".winningMessage").text("TIE UP");
        $(".next-button").css("display", "none");
        $(".play-again").text("Replay");
    } else {
        $(".winningMessage").text("YOU LOST");
        $(".play-again").text("Play Again");
        $(".next-button").css("display", "none");
        computerScore += 1;
        $(".pc-pickedBox").addClass("animation");
    }
    
    updateScores();
}

// Event listener for option clicks
$(".option").on('click', function (event) {
    youPicked = $(event.target).data('value');
    computerPicked = getRandomChoice();
    $(".game-option").css("display", "none");
    handleGameOutcome();
});

// Event listener for play-again button
$(".play-again").on('click', function (event) {
    $(".winning-option").css("display", "none");
    $(".game-option").css("display", "flex");
    $(".next-button").css("display", "none");
});

// Event listener for game rules button
$(".gameRules-button").on('click', function (event) {
    $("#game-rule").css("display", "block");
});

// Event listener for closing game rules
$("#close-rule-button").on('click', function (event) {
    $("#game-rule").css("display", "none");
});

// Event listener for next button
$(".next-button").on('click', function (event) {
    window.location.href = "./win.html";
});

// Event listener for again-play button
$(".again-play").on("click", function (event) {
    $(".winning-option").css("display", "none");
    $(".game-option").css("display", "flex");
    window.location.href = "./index.html";
});

// Initial update of scores in the UI
updateScores();
