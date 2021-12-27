let quizTimeEl = document.querySelector("p.time");
let secondsRemaining = 80;
let finalScoreEl = document.querySelector("#finalscore");

const startEl = document.querySelector("#start");

const quizQuestionsEl = document.querySelector("#quizquestions");

let quizQuestionOptionEl = document.querySelector("#quizquestionoption");

let count = 0;

const rightOrWrongAnswerEl = document.querySelector("#rightorwronganswer");

const endOfQuizEl = document.querySelector("#endofquiz");

let userInitials = document.querySelector("#userinitials");

const userHighScoresEl = document.querySelector("#userhighscores");

let highScoresListEl = document.querySelector("#highscoreslist");

let highScoresList = [];

const startButton = document.querySelector("#startbutton");

const quizAnswerButton = document.querySelectorAll("button.quizAnswerBtn");

const firstAnswer = document.querySelector("#firstanswer");
const secondAnswer = document.querySelector("#secondanswer");
const thirdAnswer = document.querySelector("#thirdanswer");
const fourthAnswer = document.querySelector("#fourthanswer");

const submitFinalScoreButton = document.querySelector("#submitfinalscore");

const returnButton = document.querySelector("#return");
const clearUserHighScores = document.querySelector("#clearhighscores");
const highScores = document.querySelector("#highscores");

const quizQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

// Timer functionality
function setTime() {
    let timerInterval = setInterval(function () {
        secondsRemaining--;
        quizTimeEl.textContent = `Time:${secondsRemaining}s`;

        if (secondsRemaining === 0 || count === quizQuestions.length) {
            clearInterval(timerInterval);
            quizQuestionsEl.style.display = "none";
            endOfQuizEl.style.display = "block";
            finalScoreEl.textContent = secondsRemaining;
        }
    }, 1000);
};

// this will start the quiz, timer, and questions
function quizStartup() {
    startEl.style.display = "none";
    quizQuestionsEl.style.display = "block";
    count = 0;

    setTime();
    setQuestion(count);
};

function setQuestion(id) {
    if (id < quizQuestions.length) {
        quizQuestionOptionEl.textContent = quizQuestions[id].question;
        firstAnswer.textContent = quizQuestions[id].answers[0];
        secondAnswer.textContent = quizQuestions[id].answers[1];
        thirdAnswer.textContent = quizQuestions[id].answers[2];
        fourthAnswer.textContent = quizQuestions[id].answers[3];
    }
};

// this will check the answer and move to the next question
function checkTheAnswer(event) {
    event.preventDefault();

    // show section for rightorwronganswer and append message
    rightOrWrongAnswerEl.style.display = "block";
    let p = document.createElement("p");
    rightOrWrongAnswerEl.appendChild(p);

    // this will time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // this will check the answer
    if (quizQuestions[count].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (quizQuestions[count].correctAnswer !== event.target.value) {
        secondsRemaining = secondsRemaining - 10;
        p.textContent = "Wrong!";
    }

    if (count < quizQuestions.length) {
        count++;
    }
    setQuestion(count);
};

function totalScore(event) {
    event.preventDefault();

    endOfQuizEl.style.display = "none";
    userHighScoresEl.style.display = "block";

    let inits = userInitials.value.toUpperCase();
    highScoresList.push({ Initials: inits, Score: secondsRemaining });

    // This will sort hire scores in order from high to low
    highScoresList = highScoresList.sort((a, b) => {
        if (a.finalscore < b.finalscore) {
          return 1;
        } else {
          return -1;
        }
      });
    
    highScoresListEl.innerHTML="";
    for (let i = 0; i < highScoresList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${highScoresList[i].userinitials}: ${highScoresList[i].finalscore}`;
        highScoresListEl.append(li);
    }
     // Adds the score to local storage
     storeHighScores();
     displayHighScores();
};

function storeHighScores() {
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
};

function displayHighScores() {
    let storedHighScoreList = JSON.parse(localStorage.getItem("highScoresList"));

    if (storedHighScoreList !== null) {
        highScoresList = storedHighScoreList;
    }
};

function clearHighScores() {
    localStorage.clear();
    highScoresListEl.innerHTML="";
};

startButton.addEventListener("click", quizStartup);

quizAnswerButton.forEach(item => {
    item.addEventListener('click', checkTheAnswer);
});

submitFinalScoreButton.addEventListener("click", totalScore);

returnButton.addEventListener("click", function () {
    userHighScoresEl.style.display = "none";
    startEl.style.display = "block";
    secondsRemaining = 80;
    quizTimeEl.textContent = `Time:${secondsRemaining}s`;
});

clearUserHighScores.addEventListener("click", clearHighScores);

highScores.addEventListener("click", function () {
    if (userHighScoresEl.style.display === "none") {
        userHighScoresEl.style.display = "block";
    } else if (userHighScoresEl.style.display === "block") {
        userHighScoresEl.style.display = "none";
    } else {
        return alert("No high scores to show.");
    }
});