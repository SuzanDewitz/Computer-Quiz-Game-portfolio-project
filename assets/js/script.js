/*jshint esversion: 6 */
//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//If StartQuiz Button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show the info box
};
// if ExitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
};

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0); //calling showQuestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(20); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
};

let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide the result box
    timeValue = 20;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to the queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue);  //calling startTimer function
    startTimerLine(widthValue);  //calling startTimeLine function
    timeText.textContent = "Time Left";  
    next_btn.classList.remove("show");  //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload();
};