// elements
var listOfHighScores = document.querySelector("#listOfHighScores");
var buttonClearHighScores = document.querySelector("#clearHighScores");
var buttonGoBack = document.querySelector("#goBack");
var noScores = document.querySelector("#noScores");

// events
buttonGoBack.addEventListener("click", goBack);
buttonClearHighScores.addEventListener("click",clearHighScores);

// variables
const highScoresKey = "highscores";

// methods
function renderHighScores() {
  var highScores = localStorage.getItem("highscores");
  listOfHighScores.innerHTML = "";
  if (highScores == null) {
    // something
    noScores.classList.remove("d-none");
  }
  else {
    highScores = JSON.parse(highScores);
    highScores.sort((first,second) => second.score - first.score);

    for (var i = 0; i < highScores.length; i++) {
      let score = highScores[i];
      let tempScore = document.createElement("li");
      tempScore.classList.add("list-group-item","bg-info","text-white");
      tempScore.textContent = i+1 + ". " + score.initials + " - " + score.score;
      listOfHighScores.appendChild(tempScore);
    }
  }
}

function goBack() {
  document.location.href = "index.html";
}

function clearHighScores() {
  localStorage.removeItem(highScoresKey);
  renderHighScores();
}

renderHighScores();