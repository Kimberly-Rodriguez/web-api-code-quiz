// Outlining the elements 
var body = document.body;
var container = document.querySelector(".container");
var card = document.querySelectorAll(".card");
var startBtn = document.querySelector("#start");
var h2El = document.querySelector("#question-header");
var choices = document.querySelectorAll(".choice");
var message = document.querySelector("#out-of-time-page");
var yesBtn = document.querySelector("#yes");
var noBtn = document.querySelector("#no");
var goodbye = document.querySelector("#goodbye");
var score = document.querySelector("#score");
var formInput = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var ulEl = document.querySelector("ul");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");
var highscores = document.querySelector("#highscores");

// users open section
var displayedCard = 0;

// users open question
var displayedQuestion = 0;

// review variables 
var evaluateDiv = document.createElement("div");
evaluateDiv.setAttribute("class", "evaluate off");
var hrEl = document.createElement("hr");
var rightOrWrongEl = document.createElement("p");
rightOrWrongEl.setAttribute("id", "right-or-wrong");
container.appendChild(evaluateDiv);
evaluateDiv.appendChild(hrEl);
evaluateDiv.appendChild(rightOrWrongEl);

// users array
var users = [];

// index for user
var userNum;
// no users let it equal one
if (JSON.parse(localStorage.getItem("users")) === null) {
  userNum = 1;
} // yet, if even one user register is noted up it by one
else {
  userNum = JSON.parse(localStorage.getItem("users")).length + 1;
}

// array of questions
var questions = [
  {
    title: "A ______ allows users to move from one webpage to another.",
    choices: ["browser", "html", "video", "hyperlink"],
    answer: "hyperlink",
  },
  {
    title: "HTML document can contain",
    choices: ["attribute", "tags", "plain text", "all of the above"],
    answer: "all of the above",
  },
  {
    title: "Which one of the following is the correct way for calling the JavaScript code?",
    choices: ["processor", "event", "rmi", "function"],
    answer: "function",
  },
  {
    title: "Which of the following is not considered a JavaScript operator?",
    choices: ["new", "this", "delete", "typeof"],
    answer: "this",
  },
  {
    title: "Using _______ statement is how you test for a specific condition.",
    choices: ["selec", "if", "switch", "for"],
    answer: "if",
  },
];

// timer set up 
var timeEl = document.querySelector("#time-left");
var secondsLeft = questions.length * 15;
var timer;

// functions

function loadPage(n) {
  card[displayedCard].classList.remove("active");
  card[n].classList.add("active");
  displayedCard = n;
}

function loadNextPage() {
  loadPage(displayedCard + 1);
  timeEl.textContent = secondsLeft;
  if (timeEl === 0) {
    alert("working!");
  } 
  console.log(timeEl);

  // timer starts
  if (displayedCard === 1) {
    setTime();
  }

  // all-done section
  if (displayedCard === 6) {
    //user's score
    score.textContent = secondsLeft;

    // timer stops
    clearInterval(timer);
  }
}

// reviewing answers correctness
function evaluateAnswer(event) {
  event.preventDefault();

  evaluateDiv.classList.remove("off");
  evaluateDiv.classList.add("on");

  // right answer message 
  if (event.target.textContent === questions[displayedQuestion].answer) {
    rightOrWrongEl.textContent = "Correct!";
  } // wrong answer message
  else {
    rightOrWrongEl.textContent = "Wrong!";

    // timper reduction for wrong answer
    if (secondsLeft > 10) {
      secondsLeft -= 10;
      timeEl.textContent = secondsLeft;
    }
  }
  displayedQuestion++;

  // remove evaluate div
  setRightOrWrongTime();
}

// quiz timer 
function setTime() {
  timer = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timer);

      // show out of time message
      sendMessage();
    }
  }, 1000);
}



// show an out of time message
function sendMessage() {
  card[displayedCard].classList.remove("active");
  message.classList.remove("off");
  message.classList.add("on");

  // yes click equal going to intro section
  yesBtn.addEventListener("click", function (event) {
    event.preventDefault();

    loadPage(0);
    message.classList.remove("on");
    message.classList.add("off");
    secondsLeft = questions.length * 15;
  });

  // no click display good goodbye message
  noBtn.addEventListener("click", function (event) {
    event.preventDefault();

    goodbye.classList.remove("off");
    goodbye.classList.add("on");
    message.classList.remove("on");
    message.classList.add("off");
  });
}

// show correct or wrong message after answer selection
function setRightOrWrongTime() {
  var timer = setInterval(function () {
    var second = 1;
    second--;

    if (second === 0) {
      clearInterval(timer);
      evaluateDiv.classList.remove("on");
      evaluateDiv.classList.add("off");
    }
  }, 1000);
}

// users array process to show highscore
function renderUsers() {
  // clear the list for a fresh start look (innerHTML: use to modify/replace HTML elements)
  ulEl.innerHTML = "";

  // showing a new highscore
  for (var i = 0; i < users.length; i++) {
    // Create a new user object that pulls from the user array
    var user = users[i];

    // using text content to show user's initials and score
    var li = document.createElement("li");
    li.textContent = user.userNum + ". " + user.initials + " - " + user.score;

    // Append the element to the unordered list
    ulEl.appendChild(li);
  }
}

// local storage set up. (note:localstorage data is specific to the protocol of the doc.)
function storeUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function init() {
  // ast highscores from local storage and parse the JSON string into an object
  var storedUsers = JSON.parse(localStorage.getItem("users"));

  // If users, use users array for array
  if (storedUsers !== null) {
    users = storedUsers;
  }

  renderUsers();
}

// onclick commands
for (var i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", evaluateAnswer);
  choices[i].addEventListener("click", loadNextPage);
}

// submit and highscore click button set up
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // initials 
  if (
    formInput.value !== "null" &&
    formInput.value !== "" &&
    (formInput.value.length == 2 || formInput.value.length == 3)
  ) {
    loadNextPage();
    formInput.value = formInput.value.toUpperCase();
  } else {
    error.classList.remove("off");
    error.classList.add("on");
  }

  // object for users array
  var user = {
    userNum: userNum,
    initials: formInput.value,
    score: secondsLeft,
  };

  // transfer highscore to users array
  users.push(user);

  renderUsers();
  storeUsers();
});

// go back , reset go back click buttons commands
backBtn.addEventListener("click", function (event) {
  event.preventDefault();

  loadPage(0);
  displayedQuestion = 0;
  formInput.value = "";
  secondsLeft = questions.length * 15;
  userNum++;
});

// clear high score, clear, reset on clic button commands
clearBtn.addEventListener("click", function (event) {
  event.preventDefault();

  ulEl.innerHTML = "";

  users = [];
  localStorage.setItem("users", JSON.stringify(users));
  userNum = 0;
});

// on click highscore section display
highscores.addEventListener("click", function () {
  loadPage(7);

  //  no users display userNum = 1
  if (JSON.parse(localStorage.getItem("users")) === null) {
    userNum = 1;
  } // If users, userNum = the number of users
  else {
    userNum = JSON.parse(localStorage.getItem("users")).length;
  }

  // stop timer 
  clearInterval(timer);
});

// calling function
loadPage(0);
startBtn.addEventListener("click", loadNextPage);
init();