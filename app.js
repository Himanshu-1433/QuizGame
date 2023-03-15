// let apiQuiz = "https://opentdb.com/api.php?amount=50";
let userName = document.getElementById("userName");
let playQuiz = document.getElementById("playQuiz");
let questionAmount = document.getElementById("questionAmount");
let questionChoice = document.getElementById("questionChoose");
let addQuiz = document.getElementById("addQuiz");
let QuizForm = document.getElementById("QuizForm");
let getQuiz = document.getElementById("getQuiz");
let playGround = document.getElementById("playGround");
let backToQuiz = document.getElementById("backToQuiz");
let createQuiz = document.getElementById("createQuiz");
let numberOfQuestion = document.getElementById("numberOfQuestion");
let numberOfAnswers = document.getElementById("numberOfAnswers");
let board = document.getElementById("board");
let quizDetail = document.getElementById("quizDetail");
quizDetail.style.display = "block";

function createBoard() {
    quizDetail.style.display = "none";
    let Questions = parseInt(numberOfQuestion.value);
    let Options = parseInt(numberOfAnswers.value) + 1;
    console.log(Questions);
    console.log(Options);
    for (let x = 0; x < Questions; x++) {
        const div = document.createElement("div");
        div.classList.add("col-12");
        div.classList.add("boxOfQuiz");
        const Question = document.createElement("input");
        Question.setAttribute("placeholder", "Enter Question hear");
        Question.classList.add("form-control");
        Question.classList.add("my-1");
        Question.required = true;
        div.appendChild(Question);
        for (let y = 0; y < Options; y++) {
            if (y == Options - 1) {
                const options = document.createElement("input");
                options.setAttribute("placeholder", "Enter Answer hear");
                options.classList.add("answerofQuizQuestion");
                options.classList.add("form-control");
                options.classList.add("my-1");
                div.appendChild(options);
                console.log("answer = " + y);
            }
            else {
                const options = document.createElement("input");
                options.setAttribute("placeholder", "Enter Option Hear");
                options.classList.add("QuestionOfQuiz");
                options.classList.add("form-control");
                options.classList.add("my-1");
                options.classList.add("mx-2");
                div.appendChild(options);
                options.required = true;
            }
        }
        board.appendChild(div);
    }
    let submit = document.createElement("button");
    submit.classList.add("btn");
    submit.classList.add("btn-outline-primary");
    submit.setAttribute("id", "submitQuizCreate")
    submit.innerHTML = "Submit";
    board.appendChild(submit);
}


getQuiz.style.display = "none";
addQuiz.addEventListener("click", () => {
    QuizForm.style.display = "none";
    getQuiz.style.display = "block";
});

backToQuiz.addEventListener("click", () => {
    QuizForm.style.display = "block";
    getQuiz.style.display = "none";
});
