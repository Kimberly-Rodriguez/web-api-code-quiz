
// Elements from the DOM
var body = document.body;
var container = document.querySelector(".main-container");
var cards = document.querySelector(".cards");
var startBtn = document.querySelector("#start");
var title = document.querySelector("#start-card-header");
var answerChoice = document.querySelector(".answer");
var outTime = document.querySelector("out-of-time-section");
var btnYes = document.querySelector("#yes");
var btnNo = document.querySelector("#no");
var seeYaMessage = document.querySelector("#see-ya");
var score = document.querySelector("#score");
var initialsInput = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var btnReturn= document.querySelector("#return-btn");
var btnClear = document.querySelector("#clear");
var redo = document.querySelector("#reenter");
var highscores = document.querySelector("#highscores");
// var ulEl = document.querySelector("ul");

// variable for user section on 
var openSection = 0;

// variable for questions open and viewed by user
var openQuestion = 0;

// naming evaluating all variables
var reviewDiv = document.createElement("div");
reviewDiv.setAttribute("class","review all"); 

//review
var hrEl = document.createElement("hr");
var rwEl = document.createElement("p");
rwEl.setAttribute("id", "right-or-wrong");
container.appendChild(evaluateDiv);
evaluateDiv.appendChild(hrEl);
evaluateDiv.appendChild(rwEl);

// Array of users
var theUser = [];

// user index options
var userId;

// If no users, userId = 1 | if users available, userId = number of users + 1
if (JSON.parse(localStorage.getItem("users")) === null) {
    userId = 1;
} else {
    userId = JSON.parse(localStorage.getItem("users")).length + 1;
}

// Questions array

var questions = [
    {
        question: "A ______ allows users to move from one webpage to another",
        choices: ["browser", "html", "video", "hyperlink"],
        answer: "hyperlink",
    },
    {
        question: "HTML document can contain",
        choices: ["attribute", "tags", "plain text", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "HTML document is saved using _________ extension.",
        choices: [".htl", ".html", ".hml", ".htnl"],
        answer: "hyperlink",
    },
    {
        question: "Which of the following is not considered a JavaScript operator?",
        choices: ["new", "this", "delete", "typeof"],
        answer: "this",
    },
    {
        question: "Using _______ statement is how you test for a specific condition.",
        choices: ["selec", "if", "switch", "for"],
        answer: "if",
    }
]

// set the timer

var timerEl = document.querySelector("#time-available");
var timeLeft = questions.length * 12;
var timer;

// Key Functions

function upSection(n) {
    cards[openSection].classList.remove("active");
    cards[n].classList.add("active");
    openSection = n;
};

function nextSection(){
    upSection(openSection +1);
    timerEl.textContent = timeLeft;


// start the timer

if (openSection === 1) {
    setTime();
}

// All done section

if (openSection === 5) {
    score.textContent = timeLeft;
    // stop the timer
    clearInterval(timer);
}

}








// should see a start button


// should see a highscores link


// and should see a time: 0

// first thing user will do is click on start button


// questions and answer buttons will show up


// timer starts

// next thing they will do is click on an answer button


// if they click on a wrong button, subtract time


// if they click on any answer button, tell them right or wrong


// if they click on any answer button, next question

// do this until you run out of questions

// when the user clicks on an answer button for the last question

    // if they click on a wrong button, subtract time

    // if they click on any answer button, tell them right or wrong

    // if they click on any answer button, next question

// show all done page

// On the all done page

// user can enter initials and press submit

// after they press submit

// send them to high scores page and display all high scores

// store their initials and score and in local storage


startBtn.addEventListener("click", loadupnextsec);

