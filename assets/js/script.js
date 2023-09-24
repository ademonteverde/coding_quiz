let quizQuestion = document.querySelector('.quiz-question');
let startQuizBtn = document.querySelector('.start-quiz-btn');
let nextBtn = document.querySelector('.next-question');
let quizStartContainer = document.querySelector('.quiz-start')
let quizContainer = document.querySelector('.quiz-container');
let feedback = document.querySelector('.feedback');
let timerContainer = document.querySelector('.quiz-timer');
let timer = document.querySelector('.timer');
let quizScoreContainer = document.querySelector('.quiz-score-container');
let quizScore = document.querySelector('.quiz-score');
let checkBoxes = document.querySelectorAll('input[type=checkbox]');
let restartQuizBtn = document.querySelector('.restart-btn');
let scoresContainer = document.querySelector('.scores-list');
let scoresLinkContainer = document.querySelector('.scores-container');

let optionElementA = document.querySelector('#optionA');
let optionElementB = document.querySelector('#optionB');
let optionElementC = document.querySelector('#optionC');
let optionElementD = document.querySelector('#optionD');

let questionIndex = 0;
let timeLeft = 120;
let width = 600;
let TIMER;
let score = 0;
let initials;

// local storage
let records = [];
let user = {};

// start timer
function startTimer() {
    TIMER = setInterval(() => {
        timeLeft--;
        timer.textContent = `You have ${timeLeft} seconds left.`;
        if (timeLeft <= 0) {
            stopTimer();
        }
        for (let checkbox of checkBoxes) {
            if (questionIndex >= quizQuestions.length - 1 && checkbox.checked === true) {
                stopTimer();
            }
        }
    }, 1000)
};

// stops timer and presents points received
function stopTimer() {
    clearInterval(TIMER);
    setScore();
    quizScoreContainer.style.display = 'block';
    quizScore.textContent = `You had ${score} of ${quizQuestions.length} correct.`
};

// saves initials and score to local storage
function setScore() {
    initials = prompt('Finished! Enter your initials to save your score.');
    user.name = initials;
    user.finalScore = score;
    records.push(user);
    if (records && initials) {
        localStorage.setItem('records', JSON.stringify(records));
    }
};

// collects scores
function getScores() {
    let recordCollect = JSON.parse(localStorage.getItem('records'));
    if (recordCollect) {
        for (let record of recordCollect) {
            records.push(record);
        }
    }
};

// randomizes question order
function shuffleQuestions() {
    quizQuestions.sort(function () {
        return 0.5 - Math.random();
    })
};

shuffleQuestions();

quizQuestion.textContent = quizQuestions[questionIndex].question;

optionElementA.textContent = quizQuestions[questionIndex].optionA;
optionElementB.textContent = quizQuestions[questionIndex].optionB;
optionElementC.textContent = quizQuestions[questionIndex].optionC;
optionElementD.textContent = quizQuestions[questionIndex].optionD;

// event listeners
startQuizBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', restartQuiz);

// if statement to go through each question
function nextQuestion() {
    for (let checkbox of checkBoxes) {
        if (questionIndex < quizQuestions.length - 1 && checkbox.checked) {
            questionIndex++;
            resetQuestions();
        }
    }
    quizQuestion.textContent = quizQuestions[questionIndex].question;

    optionElementA.textContent = quizQuestions[questionIndex].optionA;
    optionElementB.textContent = quizQuestions[questionIndex].optionB;
    optionElementC.textContent = quizQuestions[questionIndex].optionC;
    optionElementD.textContent = quizQuestions[questionIndex].optionD;
};

//  calls functions from start button
function startQuiz() {
    startTimer();
    disableCheckboxes();
    checkAnswers();
    getScores();
    scoresLinkContainer.style.display = 'none';
    quizStartContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timerContainer.style.display = 'block';
};

// reloads page
function restartQuiz() {
    document.location.reload();
}

// resets the checkboxes for restarting the quiz
function resetQuestions() {
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox.nextSibling.style.opacity = '1';
    }
    feedback.textContent = '';
    feedback.classList.remove('correct', 'wrong');
};

// disabled checkboxes after being clicked
function disableCheckboxes() {
    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', (e) => {
            if (e.target.checked) {
                for (let unchecked of checkboxes) {
                    if (!unchecked.checked) {
                        unchecked.disabled = true;
                        unchecked.nextSibling.style.opacity = '0.5';
                    }
                    checkbox.disabled = true;
                }
            }
        })
    }
};

// checks to see if selection is correct or incorrect
function checkAnswers() {
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', (e) => {
            if (e.target.nextSibling.dataset.value === quizQuestions[questionIndex].correctAnswer) { 
                score ++;
                feedback.textContent = 'That is correct!';
                feedback.classList.add('correct');
            } else {
                feedback.textContent = 'That is wrong!';
                feedback.classList.add('wrong');
                timeLeft -= 10;
            }
            setTimeout(function () {
                nextQuestion();
            }, 1000);
        })
    }
};



const quizQuestions = [
    // Question #1
    {
        question: "What does HTML stands for?",
        optionA: "Hyper Text Modular Linguistics",
        optionB: "Hyperlinks and Text Markup Language",
        optionC: "Hyper Text Markup Language",
        optionD: "Hyper Transport Marketing Language",
        correctAnswer: "optionC"
    },

    // Question #2
    {
        question: "What does CSS stand for?",
        optionA: "Cascading Style Sheets",
        optionB: "Cascading Stun Sheets",
        optionC: "Colorful Style Sheets",
        optionD: "Cascading Style Startups",
        correctAnswer: "optionA"
    },

    // Question #3
    {
        question: "What color is #FFFFFF?",
        optionA: "Blue",
        optionB: "Black",
        optionC: "White",
        optionD: "Purple",
        correctAnswer: "optionC"
    },

    // Question #4
    {
        question: "What are different types of lists in HTML?",
        optionA: "Ordered and Unordered Lists",
        optionB: "Dotted and Dashed Lists",
        optionC: "Bolded and Underlined Lists",
        optionD: "Numbered and Bullet Lists",
        correctAnswer: "optionA"
    },

    // Question #5
    {
        question: "Which is not considered a formatting tag in HTML?",
        optionA: "<b>",
        optionB: "<a>",
        optionC: "<i>",
        optionD: "<sub>",
        correctAnswer: "optionB"
    },

    // Question #6
    {
        question: "What kind of color is #000000",
        optionA: "Hex",
        optionB: "RGB",
        optionC: "HSL",
        optionD: "Binary",
        correctAnswer: "optionA"
    },

    // Question #7
    {
        question: "How is JavaScript called?",
        optionA: "<nav>",
        optionB: "<html>",
        optionC: "<script>",
        optionD: "<style>",
        correctAnswer: "optionC"
    },

    // Question #8
    {
        question: "How is a tag ended?",
        optionA: "</>",
        optionB: "<>",
        optionC: "<,>",
        optionD: "<->",
        correctAnswer: "optionA"
    },

    // Question #9
    {
        question: "How is JavaScript called?",
        optionA: "<nav>",
        optionB: "<html>",
        optionC: "<script>",
        optionD: "<style>",
        correctAnswer: "optionC"
    },

    // Question #10
    {
        question: "How is a tag ended?",
        optionA: "</>",
        optionB: "<>",
        optionC: "<,>",
        optionD: "<->",
        correctAnswer: "optionA"
    }

];
