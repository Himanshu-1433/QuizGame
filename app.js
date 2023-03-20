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
let board = document.getElementById("board");
let quizDetail = document.getElementById("quizDetail");
let getTypeOfQuiz = document.getElementById("getTypeOfQuiz");
quizDetail.style.display = "block";

let ShowResult = document.getElementById("ShowResult");
ShowResult.style.display = "none";
let result = document.getElementById("result");
result.style.display = "none";

function createBoard() {
  quizDetail.style.display = "none";
  let Questions = parseInt(numberOfQuestion.value);
  let Options = 5;
  let obj = {};
  obj.type = getTypeOfQuiz;
  for (let x = 0; x < Questions; x++) {
    const div = document.createElement("div");
    div.setAttribute("class", "col-12 boxOfQuiz");
    const Question = document.createElement("input");
    Question.setAttribute("placeholder", x + 1 + ". Enter Question hear");
    Question.setAttribute("class", "form-control my-1 question");
    Question.required = true;

    div.appendChild(Question);

    for (let y = 0; y < Options; y++) {
      if (y == Options - 1) {
        const options = document.createElement("input");
        options.setAttribute("placeholder", "Enter Answer hear");
        options.setAttribute("class", "answerofQuizQuestion form-control my-1");
        div.appendChild(options);
        options.required = true;
      } else {
        const options = document.createElement("input");
        options.setAttribute("placeholder", "Enter Option number " + (y + 1));
        options.setAttribute("class", "optionOfQuiz form-control my-2");
        div.appendChild(options);
        options.required = true;
      }
    }
    board.appendChild(div);
  }
  let submit = document.createElement("button");
  submit.setAttribute("id", "submitQuizCreate");
  submit.setAttribute("class", "btn btn-outline-primary");
  submit.innerHTML = "Submit";
  submit.setAttribute("onclick", "checkFullfill()");
  board.appendChild(submit);
}

function checkFullfill() {
  let Question = document.getElementsByClassName("question");
  let Answer = document.getElementsByClassName("answerofQuizQuestion");
  let options = document.getElementsByClassName("optionOfQuiz");
  let errQues = 0;
  let errAns = 0;
  let errOpt = 0;
  for (let x = 0; x < Question.length; x++) {
    if (Question[x].value == "") {
      errQues++;
    }
  }
  for (let x = 0; x < Answer.length; x++) {
    if (Answer[x].value == "") {
      errAns++;
    }
  }
  for (let x = 0; x < options.length; x++) {
    if (options[x].value == "") {
      errOpt++;
    }
  }
  let ret = 0;
  if (errQues > 0) {
    ret = 1;
  } else {
    ret = 0;
  }

  if (errAns > 0) {
    ret = 1;
  } else {
    ret = 0;
  }
  if (errOpt) {
    ret = 1;
  } else {
    ret = 0;
  }

  if (ret != 1) {
    getDataOfCreatedQuiz();
  }
}
let alr = document.getElementById("msgAdded");
alr.style.display = "none";

let storage = JSON.parse(localStorage.getItem("QuizData"));
if (storage == null) {
  let dummyArray = [];
  let dummyObj = {};
  dummyArray.push(dummyObj);
  localStorage.setItem("QuizData", JSON.stringify(dummyArray));
  console.log("First value are added");
  console.log(storage);
}
function getDataOfCreatedQuiz() {
  let Question = document.getElementsByClassName("question");
  let Answer = document.getElementsByClassName("answerofQuizQuestion");
  let options = document.getElementsByClassName("optionOfQuiz");
  let arrOfOptions = [];
  let len = 0;

  // for loop for the enter options into the array
  for (let x = 0; x < Question.length; x++) {
    let str = [];
    for (let y = 0; y < 4; y++) {
      if (len < options.length) {
        str.push(options[len].value);
        len++;
      }
    }
    arrOfOptions.push(str);
  }
  // for loop for the create data as JSON Formate
  let alrBox = 0;
  let jsonMainData = {};
  let data = {};
  let arr = [];
  let obj = {};
  jsonMainData.type = getTypeOfQuiz.value;
  for (let x = 0; x < Question.length; x++) {
    data.ques = Question[x].value;
    data.option = calculation(arrOfOptions[x], Answer[x].value);
    obj.data = data;
    arr.push(obj);
    data = {};
    obj = {};
  }
  jsonMainData.questionsBank = arr;
  let arr2 = [];
  arr2.push(jsonMainData);

  storage.push(arr2);
  localStorage.setItem("QuizData", JSON.stringify(storage));
  console.log("Items are added");
  alrBox = 1;

  if (alrBox == 1) {
    QuizForm.style.display = "block";
    getQuiz.style.display = "none";
    alr.style.display = "block";
    setInterval(() => {
      window.location.reload();
    }, 2000);
  }
}

getQuiz.style.display = "none";
addQuiz.addEventListener("click", () => {
  QuizForm.style.display = "none";
  getQuiz.style.display = "block";
});

backToQuiz.addEventListener("click", () => {
  QuizForm.style.display = "block";
  getQuiz.style.display = "none";
  window.location.reload();
});

function calculation(arr, ans) {
  let incorrectArray = [];
  let error = "Nothing match";
  let correct = error;
  for (let x = 0; x < arr.length; x++) {
    if (arr[x] === ans) {
      correct = arr[x];
    } else {
      incorrectArray.push(arr[x]);
    }
  }
  let data = {
    correctAns: correct,
    incorrectAns: incorrectArray,
  };
  return data;
}

// frontend view
// LocalStorage data
let getItemOfTheLocalstorage = JSON.parse(localStorage.getItem("QuizData"));
// Quiz Logics

let arrOfQuestionLength = getItemOfTheLocalstorage.length;

// get the type of the question and append in the select option
for (let x = 1; x < arrOfQuestionLength; x++) {
  for (let y = 0; y < 1; y++) {
    let optionOfSelect = document.createElement("option");
    optionOfSelect.innerHTML = getItemOfTheLocalstorage[x][y]["type"];
    optionOfSelect.value = getItemOfTheLocalstorage[x][y]["type"];
    questionChoice.appendChild(optionOfSelect);
  }
}

let showQuizType = document.getElementById("showQuizType");
let QuizArea = document.getElementById("QuizArea");
let userNameShow = document.getElementById("userNameShow");
let QuestionNum = document.getElementById("QuestionNum");
let QuestionStr = document.getElementById("QuestionStr");

// for option

let optionOne = document.getElementById("optionOne");
let optionTwo = document.getElementById("optionTwo");
let optionThree = document.getElementById("optionThree");
let optionFour = document.getElementById("optionFour");
let optionLab = document.getElementsByClassName("optionLab");
let QuizOption = document.getElementsByName("QuizOption");
// submit Quiz
let SubmitQuiz = document.getElementById("SubmitQuiz");

let currentQuestion = 0;
let QuestionCount = 0;
questionChoice.addEventListener("change", function () {
  for (let i = 1; i < arrOfQuestionLength; i++) {
    if (getItemOfTheLocalstorage[i][0]["type"] == questionChoice.value) {
      QuestionCount = i;
      break;
    }
  }
  lengthOfTheTypeQuestion =
    getItemOfTheLocalstorage[QuestionCount][0]["questionsBank"].length - 1;
  console.log(lengthOfTheTypeQuestion);
});

QuizArea.style.display = "none";
let correctAnswerArr = [];
playQuiz.addEventListener("click", () => {
  QuizArea.style.display = "block";
  QuizForm.style.display = "none";
  userNameShow.innerHTML = userName.value;
  showQuizType.innerHTML = questionChoice.value;
  console.log(getItemOfTheLocalstorage[QuestionCount]);
  for (
    let x = 0;
    x < getItemOfTheLocalstorage[QuestionCount][0]["questionsBank"].length;
    x++
  ) {
    correctAnswerArr.push(
      getItemOfTheLocalstorage[QuestionCount][0]["questionsBank"][x]["data"][
      "option"
      ]["correctAns"]
    );
  }
  setQuiz();
});

let UserResponse = [];
let AnsoftheCorrect = 0;
SubmitQuiz.addEventListener("click", () => {
  if (currentQuestion < lengthOfTheTypeQuestion) {
    currentQuestion++;
    ShowResult.style.display = "none";
  } else {
    ShowResult.style.display = "block";
    SubmitQuiz.style.display = "none";
  }
  UserResponse.push(displayValueChecRadioBtn());
  setQuiz();
});
ShowResult.addEventListener("click", () => {
  let resultScore = finalCalculation(UserResponse, correctAnswerArr);
  result.style.display = "block";
  let scoreBoard = document.getElementById("scoreBoard");
  scoreBoard.innerHTML = resultScore + "/" + UserResponse.length;
  let home = document
    .getElementById("home")
    .addEventListener("click", function () {
      window.location.reload();
    });
});
console.log(UserResponse);
console.log(correctAnswerArr);

function setQuiz() {
  let typeOfTheUser = 0;
  for (let i = 1; i < arrOfQuestionLength; i++) {
    if (getItemOfTheLocalstorage[i][0]["type"] == questionChoice.value) {
      typeOfTheUser = i;
      break;
    }
  }

  for (let x = currentQuestion; x < currentQuestion + 1; x++) {
    QuestionNum.innerHTML = x + 1;
    QuestionStr.innerHTML =
      getItemOfTheLocalstorage[typeOfTheUser][0]["questionsBank"][x]["data"][
      "ques"
      ];
    let arrOfOptionsINQuizBoard = [];
    arrOfOptionsINQuizBoard.push(
      getItemOfTheLocalstorage[typeOfTheUser][0]["questionsBank"][x]["data"][
      "option"
      ]["correctAns"]
    );
    arrOfOptionsINQuizBoard.push(
      getItemOfTheLocalstorage[typeOfTheUser][0]["questionsBank"][x]["data"][
      "option"
      ]["incorrectAns"][0]
    );
    arrOfOptionsINQuizBoard.push(
      getItemOfTheLocalstorage[typeOfTheUser][0]["questionsBank"][x]["data"][
      "option"
      ]["incorrectAns"][1]
    );
    arrOfOptionsINQuizBoard.push(
      getItemOfTheLocalstorage[typeOfTheUser][0]["questionsBank"][x]["data"][
      "option"
      ]["incorrectAns"][2]
    );
    let randomNum = randomNumArr();
    for (let x = 0; x < 4; x++) {
      QuizOption[x].value = arrOfOptionsINQuizBoard[randomNum[x]];
      optionLab[x].innerHTML = arrOfOptionsINQuizBoard[randomNum[x]];
    }
  }
}

function randomNumArr() {
  let arr = [];
  while (arr.length != 4) {
    let random = Math.floor(Math.random() * 4);
    if (arr.indexOf(random) == -1) {
      arr.push(random);
    }
  }
  //   console.log(arr);
  return arr;
}

function displayValueChecRadioBtn() {
  for (let i = 0; i < QuizOption.length; i++) {
    let str = "";
    if (QuizOption[i].checked) {
      QuizOption[i].checked = false;
      str = QuizOption[i].value;
      return str;
    } else {
      QuizOption.checked = false;
      str = "Wrong";
    }
    console.log(str);
  }
}

function finalCalculation(userResponse, correctArray) {
  console.log(userResponse);
  console.log(correctArray);
  // userResponse , correctArray
  let correct = 0;  
    for (let y = 0; y < correctArray.length; y++) {
      if (userResponse[y] == correctArray[y]) {
        correct++;
        console.log(correct);
      }
    }
  return correct;
}
