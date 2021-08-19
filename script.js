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
var btnReturn = document.querySelector("#return-btn");
var btnClear = document.querySelector("#clear");
var redo = document.querySelector("#reenter");
var highscores = document.querySelector("#highscores");
var ulEl = document.querySelector("ul");

// variable for user section on 
var openSection = 0;

// variable for questions open and viewed by user
var openQuestion = 0;

// naming evaluating all variables
var reviewDiv = document.createElement("div");
reviewDiv.setAttribute("class", "evaluate off");

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

// set timer

var timerEl = document.querySelector("#time-available");
var timeLeft = questions.length * 15;
var timer;

// Key Functions

function upSection(n) {
    cards[openSection].classList.remove("active");
    cards[n].classList.add("active");
    openSection = n;
};

function nextSection() {
    upSection(openSection + 1);
    timerEl.textContent = timeLeft;


    // start the timer

    if (openSection === 1) {
        setTime();
    }

    // All done section

    if (openSection === 6) {
        score.textContent = timeLeft;
        // stop the timer
        clearInterval(timer);
    }
}

// verification of answers
function verifiAnswer(event) {
    event.preventDefault()

    reviewDiv.classList.remove("off");
    reviewDiv.classList.add("on");

    // if correct show correct answer 

    if (event.target.textContent ===
        questions[openQuestion].answer) {
        rwEl.textContent = "Correct!";
    } // if wrong show "Wrong!"
    else {
        rwEl.textContent = "Wrong!";

        // time reduction
        if (timeLeft > 10) {
            timeLeft -= 10;
            timerEl.textContent = timeLeft;
        }
    }

    openQuestion++;


    // remove review Div
    rwEl();
}


// timer for quiz

function setTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInverval(timer);
            // show out of time section card
            sendMessage();
        }
    }, 1000);
};

// show out of time note

function sendMessage() {
    cards[openSection].classList.revove("active");
    outTime.classList.remove("off");
    outTime.classList.add("on");

    // if user selects yes, return to start page
    btnYes.addEventListener("click", function (event) {
        event.preventDefault();


        upSection(0);
        outTime.classList.remove("on");
        outTime.classList.add("off");
        timeLeft = questions.length * 15;


    });

    // if user selects no, show take care note
    btnNo.addEventListener("click", function (event) {
        event.preventDefault();

        seeYaMessage.classList.remove("off");
        seeYaMessage.classList.add("on");
        outTime.classList.remove("on");
        outTime.classList.add("off");


    });
}

// show the message "correct or wrong" show

function setRightOrWrongTime() {
    var time = setInterval(function () {
        var second = 1;
        second--;

        if (second === 0) {
            clearInterval(timer);
            reviewDiv.classList.remove("on");
            reviewDiv.classList.add("off");
        }
    }, 1000);
}


// higher score user array loop

function renderUser() {

    //clearing the elements for clear results each time
    ulEl.innerHTML = " ";

    //Showing a new value per highscore
    for (var i = 0; i < theUser.length; i++) {
        // creating a new object that pulls from array
        var user = theUser[i];

        // place the text content of the list element to the user's info

        var li = document.createElement("li");

        li.textContent = theUser.userId + "." + theUser.initials + "-" + theUser.score;


        // add the list element to the unordered list

        ulEl.appendChild(li);

    }
}


// store users in local storage

function useStorage() {
    localStorage.setItem("theUser", JSON.stringify(theUser));
}


function init() {
    // Get stored past highscores from local storage
    // Parse the JSON string into an object

    var storedUsers = JSON.parse(localStorage.getItem("theUser"));

    // If there are users in the local storage, set the users array to that array
    if (storedUsers !== null) {
        users = storedUsers;
    }

    renderUsers();
}

// Iterate through all the choices buttons to add an "ON CLICK" event for them to
// 1. load the next page
// 2. evaluate if the answer is right or wrong
for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", evaluateAnswer);
    choices[i].addEventListener("click", loadNextPage);
}

// If "Submit" button is clicked,
// load the highscores page
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();



    // Data validation on initials form
    if (
        initialsInput.value !== "null" &&
        initialsInput.value !== "" &&
        (initialsInput.value.length == 2 || initialsInput.value.length == 3)
    ) {
        loadNextPage();
        initialsInput.value = initialsInpu.value.toUpperCase();
    } else {
        redo.classList.remove("off");
        redo.classList.add("on");
    }

    // Create an object to store inside users array
    var theUser = {
        userId: userId,
        initials: initialsInput.value,
        score: timeLeft,
    };


    // Add new highscore
    theUser.push(theUser);



    renderUsers();
    storeUsers();
});



// If go-back button is clicked: show start page, reset values, raise the userIdby one
btnReturn.addEventListener("click", function (event) {
    event.preventDefault();

    upSection(0);
    openQuestion = 0;
    initialsInput.value = "";
    timeLeft = questions.length * 15;
    userId++;
});


// If clear-HS button is clicked: clear the list, reset number to 0, clear the local storage
btnClear.addEventListener("click", function (event) {
    event.preventDefault();

    ulEl.innerHTML = "";

    users = [];
    localStorage.setItem("users", JSON.stringify(users));
    userId = 0;
});


// If view card, show highscore page
highscores.addEventListener("click", function () {
    upSection(7);


    // No user then display number one
    if (JSON.parse(localStorage.getItem("users")) === null) {
        userId = 1;
    } // Displaying the number of users
    else {
        userId = JSON.parse(localStorage.getItem("users")).length;
    }

    // Stop Timer
    clearInterval(timerEl);
});


// Functions on Call 
upSection(0);
startBtn.addEventListener("click", nextSection);
init();


