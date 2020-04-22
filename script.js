// elements and variables
var cardIntro = document.querySelector("#cardIntro");
var cardQuestion = document.querySelector("#cardQuestion");
var h1Question = document.querySelector("#h1Question");
var listAnswers = document.querySelector("#listAnswers");
var buttonStartQuiz = document.querySelector("#buttonStartQuiz");
var cardScore = document.querySelector("#cardScore");
var spanScore = document.querySelector("#spanScore");
var spanNumProblems = document.querySelector("#spanNumProblems");
var time = document.querySelector("#time");
var formSaveScore = document.querySelector("#formSaveScore")
var initials = document.querySelector("#initals");

var questionIndex = 0;
var score = 0;
const totalMinutes = 5;
var totalSeconds = totalMinutes * 60;
//var totalSeconds = 60;
var elapsedSeconds = 0
var timer;
const highScoresKey = "highscores";
var wrongTimer;


// event listeners
buttonStartQuiz.addEventListener("click",onStartQuizClick);
listAnswers.addEventListener("click", onListAnswersClick);
formSaveScore.addEventListener("submit",onFormSaveScoreSubmit);

// behavior
function onStartQuizClick() {
  // start timer
  startTimer();
  
  cardIntro.classList.add("d-none");
  cardQuestion.classList.remove("d-none");
  renderProblem();
}

function startTimer() {
  timer = window.setInterval(onTick,1000);
  elapsedSeconds = 0;
  renderTime();
}

function stopTimer() {
  window.clearInterval(timer);
}

function pad0(piece) {
  return piece<10?"0"+piece:""+piece;
}

function renderTime() {
  var remainingSeconds = totalSeconds - elapsedSeconds;
  var minutes = Math.floor(remainingSeconds / 60);
  var seconds = remainingSeconds % 60;
  time.textContent = pad0(minutes) + ":" + pad0(seconds);
}

function onTick() {
  elapsedSeconds++;
  if (elapsedSeconds >= totalSeconds) {
    alert("Time's up");
    stopTimer();
    endQuiz();
  }
  renderTime();
}

function renderProblem() {
  if (questionIndex >= problems.length) endQuiz();
  var problem = problems[questionIndex];
  h1Question.textContent = problem.question;

  listAnswers.innerHTML = "";
  for (var i = 0; i < problem.answers.length; i++) {
    let answer = problem.answers[i];
    let answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.classList.add("btn","btn-primary","col-sm-12","m-1");
    answerButton.setAttribute("data-index",i);
    listAnswers.appendChild(answerButton);
  }
}

function endQuiz() {
  if (timer) {
    window.clearInterval(timer);
  }
  cardQuestion.classList.add("d-none");
  cardScore.classList.remove("d-none");
  spanScore.textContent = score;
  spanNumProblems.textContent = problems.length;
}


function onListAnswersClick(event) {
  var buttonIndex;
  if (event.target.matches("button")) {
    buttonIndex = event.target.getAttribute("data-index");
    answerClicked(buttonIndex);
  }
}

function answerClicked(index) {
  index = parseInt(index);
  if (index === problems[questionIndex].correct) {
    score++;
  }
  else {
    handleWrong();
    
  }
  questionIndex++;
  renderProblem();
}

function handleWrong() {
  elapsedSeconds+=10;
  if (wrongTimer !== null) {
    clearTimeout(wrongTimer);
  }
  time.classList.add("text-danger","font-weight-bold");
  wrongTimer = window.setTimeout(function() {time.classList.remove("text-danger","font-weight-bold");},1000)
}

function onFormSaveScoreSubmit() {
  var initial = initials.value;

  var highScores = localStorage.getItem(highScoresKey);
  if (highScores === null) {
    highScores = [];
  }
  else {
    highScores = JSON.parse(highScores);
  }
  highScores.push({"initials": initial,"score": score});
  localStorage.setItem(highScoresKey,JSON.stringify(highScores));
}

// data
problems = [
  { 
    question: "What is the correct way to start a for loop over an array magicArray[]?",
    answers: [
      "for (index in array) {}",
      "for (var i=0; i < magicArray.length; i++) {}",
      "for (var i=0; i < array.length; i++) {}",
      "Array.forEach(function(magicArray) {});",
      "magicArray.forEach(function(item) {});",
      "A and C",
      "A, C, and E",
      "B and D",
      "B and E",
      "C and D",
      "D and E",
      "All of the above"
    ],
    correct: 8
  },
  { 
    question: 'What is the correct way to set the textContent of an html node <div id="myDiv"></div> to be "Hello World"?',
    answers: [
      '$("#myDiv").text("Hello World")',
      'document.querySelector("#myDiv").textContent = "Hello World"',
      'document.querySelectorAll("#myDiv")[0].textContent = "Hello World"',
      'document.getElementById("#myDiv").textcontent = "Hello World"',
      "All of the above"
    ],
    correct: 4
  },
  { 
    question: 'What is the correct way to add a css class myClass to an element <div id="myElement"></div>?',
    answers: [
      'myElement.addCssClass("myClass");',
      '$("#myElement").addClass("myClass");',
      'document.querySelector("#myElement").classList.add("myClass");',
      'document.querySelector("#myElement").classes.add("myClass");',
      'document.getElementById("#myElement").classList.add("myClass");',
      '$("myClass").addToElement($("#myElement"));',
      'A and B',
      'B and C',
      'B, C, and E',
      'C and D',
      'D and E',
      "All of the above"
    ],
    correct: 8
  },
  { 
    question: 'What is the correct way to add a click event to a button <button id="myButton"></button>?',
    answers: [
      'document.getElementById("#myButton").addEventListener("click",function() {});',
      'document.getButton("#myButton").addEventListener("click",function() {});',
      'document.querySelector("#myButton").onClick(function() {});',
      'document.querySelector("#myButton").addEventListener("click", function() {});',
      '$("#myButton").click(function() {});',
      '$("#myButton").on("click",function() {});',
      'A and B',
      'A, D, E, and F',
      'A, D, and F',
      'B and C',
      'B, C, and E',
      'C and D',
      'D and E',
      "All of the above"
    ],
    correct: 7
  },
  { 
    question: 'What is the correct way to add a mouseover event to a div <div id="hoverchangecolor"></div>?',
    answers: [
      '$("#hoverchangecolor").mouseover(function() {});',
      'document.getElementById("#hoverchangecolor").addEventListener("mouseover", function() {});',
      '$("#hoverchangecolor").on("mouseover", function(){});',
      'document.querySelector("#hoverchangecolor").addEventListener("mouseover", function() {});',
      'document.querySelectorAll("#hoverchangecolor")[0].addEventListener("mouseover", function() {});',
      '$("#hoverchangecolor").on("hover", function() {});',
      'A and B',
      'A, D, E, and F',
      'A, D, and F',
      'B and C',
      'B, C, and E',
      'C and D',
      'D and E',
      "All of the above"
    ],
    correct: 13
  },
  { 
    question: 'What is the correct way to set a div <div id="imgBkgd"></div>\'s background image css property to image.jpg?',
    answers: [
      '$("#imgBkgd").background-image(url("image.jpg"));',
      'document.getElementById("#imgBkgd").backgroundImage = "url(\'image.jpg\')";',
      'document.getElementById("#imgBkgd").style.backgroundImage = "url(\'image.jpg\')";',
      'document.getElementById("#imgBkgd").style.backgroundImage = "image.jpg";',
      'document.querySelector("#imgBkgd").backgroundImage = "url(\'image.jpg\')";',
      '$("#imgBkgd").css("background-image","url(\'image.jpg\')");',
      'A and B',
      'A, B, E, and F',
      'A, C, and E',
      'B and C',
      'B, C, and F',
      'C and D',
      'C and F',
      'D and E',
      "All of the above"
    ],
    correct: 12
  }
]

