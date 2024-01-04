var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quizPage");
var questionTextEl = document.querySelector("#questionText");
var questionChoices = document.querySelector("#questionChoices");
var startBtn = document.querySelector("#startBtn");
var timerEl = document.querySelector("#timer");
var quizInnerContainer = document.querySelector("#quizInner");
var endQuiz = document.querySelector("#endQuizPage");
var scoreSpan = document.querySelector("#scoreSpan");
var nameSpan = document.querySelector("#nameSpan");
var nameInput = document.querySelector("#nameInput")
var submit = document.querySelector("#submit");

var secondsLeft = 31;

// endQuizFunction hides quiz page and displays end quiz page and fires setHighScore function which grabs local storage
function endQuizFunction() {
    //are you out of questions or out of time
    questionTextEl.textContent = "";
    quizPage.classList.add("isHidden");
    endQuiz.classList.remove("isHidden");
    endQuiz.classList.add("endQuizPageStyling");
    setHighScore();
}

function setHighScore() {
    var name = localStorage.getItem("name");
    var highScore = localStorage.getItem("highScore");
    nameSpan.textContent = " " + name;
    scoreSpan.textContent = " " + highScore;
}

submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (nameInput.value.trim() == "" || nameInput.value == null) {
        alert("Please enter a valid name");
    } else {
        var name = nameInput.value;
        var highScore = secondsLeft;

        localStorage.setItem("name", name);
        localStorage.setItem("highScore", highScore);
        setHighScore();
    }
})

// setTime function starts the setInterval at 30 seconds and keeps running every 1000 milliseconds as
// long as secondsLeft is more than 0 seconds and/or current page is less than questionsArray.length

function setTime() {
    var timerInterval = setInterval(function () {
        if (secondsLeft <= 0 || (currentPage >= questionsArray.length)) {
            // console.log("time left: " + secondsLeft);
            clearInterval(timerInterval);
            timerEl.textContent = "";
            timerEl.classList.remove("timerStyling");
            endQuizFunction();
            // console.log(" Seconds left is less than or equal to 0 or current page is greater or equal to questions array //n" + secondsLeft);
            return;
        } else {
            timerEl.classList.add("timerStyling");
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds left";
            // console.log(" Else statement is running and endQuiz function hasn't been triggered" + secondsLeft);
        }
    }, 1000)
}

// Array of objects with questions, answers, and correct answer keys
var questionsArray = [
    {
        questionText: "1. What is javascript?",
        answers: ["A:  A library", "B:  A coding framework", "C:  An object based coding language", "D:  A text editor"],
        correctAnswer: 2
    },

    {
        questionText: "2. What does the modulus operator give back?",
        answers: ["A: The sum of two numbers", "B: The remainder", "C: The modulus operator does not exist", "D: I am not really sure"],
        correctAnswer: 1
    },

    {
        questionText: "3. What is JQuery",
        answers: ["A: It's the same thing as javascript", "B: It's a new coding language that's better than javascript", "C: It's a Javascript library", "D: It's a Javascript framework"],
        correctAnswer: 2
    },

    {
        questionText: "4. How do you add a class to an element using javascript?",
        answers: ["A: With classlist.add('')", "B: You can only add classes on HTML", "C: You can write the class using the stringify() method", "D: I'm not sure if it's possible"],
        correctAnswer: 0
    }
]

// when user clicks the start quiz button, the clock will start ticking
// and the start page will be hidden and the quiz page will appear and the populateNextQuestion function will be fired

startBtn.addEventListener("click", function () {
    setTime();

    startPage.classList.add("isHidden");

    quizPage.classList.remove("isHidden");

    quizInnerContainer.classList.add("quizInnerContainer");
    questionChoices.classList.add("questionChoicesStyling");

    populateNextQuestion();
})

var currentPage = 0

// populateNextQuestion function will populate a question and choices if the currentPage is less than the questionsArray.length
function populateNextQuestion() {
    questionChoices.innerHTML = "";
    if (currentPage < questionsArray.length) {
        questionTextEl.textContent = questionsArray[currentPage].questionText;
        questionsArray[currentPage].answers.forEach(function (choice, index) {
            var button = document.createElement("button");

            button.textContent = choice
            button.classList.add("choicesButton")
            questionChoices.append(button);
            if (questionsArray[currentPage].correctAnswer === index) {
                button.dataset.answer = questionsArray[currentPage].correctAnswer;
            }

            button.addEventListener("click", function (event) {
                if (event.target.dataset.answer == questionsArray[currentPage].correctAnswer) {
                    currentPage++;
                    populateNextQuestion();
                } else {
                    secondsLeft = (secondsLeft - 10);
                    currentPage++
                    populateNextQuestion();
                }
            })
        })
    }
    else {
        endQuizFunction();
    }
}
