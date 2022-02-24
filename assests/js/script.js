//global variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const timerHead = document.getElementById("timerHead");
const timerCount = document.getElementById("quizTimerDisplay");
const formInfo = document.getElementById("form-container");
let sec = 30;
let finalScore = 0;

let shuffledQuestions, currentQuestionIndex;
//event listeners for my buttons
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
//starts the game 
function startGame() {
  startButton.classList.add("none");
  timerHead.classList.remove("none");
  timerCount.classList.remove("none");
  timer();
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("none");
  setNextQuestion();
}
//calls function 
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
//creates a button for each of the answers to a question
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
//fixed issue where the previous questions remained after pressing next
function resetState() {
  nextButton.classList.add("none");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("none");
  } else {
    startButton.innerText = "restart";
    startButton.classList.remove("none");
    formInfo.classList.remove("none");
    timerHead.classList.add("none")
    timerCount.classList.add("none")
    sec += 1000;

  }
  nextButton.classList.remove("none");
}
//system for adding score for every correct answer 50+ for incorrect 100+ for correct
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    finalScore += 50;
    console.log(finalScore);
  } else {
    element.classList.add("wrong");
    ;
  }
}
// function for removing the classes that change the color of the questions
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
//variable containing questions
const questions = [
  {
    question: "what is 4 + 4",
    answers: [
      { text: "8", correct: true },
      { text: "6", correct: false },
      { text: "4", correct: false },
      { text: "45", correct: false },
    ],
  },
  {
    question: "what is 4 - 4",
    answers: [
      { text: "6", correct: false },
      { text: "4", correct: false },
      { text: "45", correct: false },
      { text: "0", correct: true },
    ],
  },
  {
    question: "what is 6 + 4",
    answers: [
      { text: "8", correct: false },
      { text: "10", correct: true },
      { text: "4", correct: false },
      { text: "45", correct: false },
    ],
  },
];
//ends game when the timer hits 0
function gameOver() {
  window.alert("You Lose! Try again some other time!");
  window.location.reload();
}
//timer function for the quiz
function timer() {
  var timer = setInterval(function () {
    document.getElementById("quizTimerDisplay").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      //ends game when timer hits 0
      gameOver();
      clearInterval(timer);
    }
  }, 1000);
}
//local storage system
let scoreSaved = [];
const addScore = (ev) => {
  ev.preventDefault();
  let score = {
    name: document.getElementById("name").value,
    highScore: finalScore,
  };
  scoreSaved.push(score);
  document.forms[0].reset();

  localStorage.setItem("ScoreList", JSON.stringify(scoreSaved));
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", addScore);
});
