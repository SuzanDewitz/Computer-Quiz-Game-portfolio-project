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
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
//If Click Next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb+ "." + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// div tags for icons
let checkIconTag = '<div class="icon check"><i class="fa-sharp fa-solid fa-check"></i></div>';
let xmarkIconTag = '<div class="icon xmark"><i class="fa-solid fa-x"></i></div>';

// if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");  //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", checkIconTag); // adding tick icon
    }else{  //answer is incorrect
        answer.classList.add("incorrect");  //addng red color to incorrect selected option
        answer.insertAdjacentHTML("beforeend", xmarkIconTag); //adding cress icon

        //if answer is incorrect then automatically selected the correct answer
        for(i=0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", checkIconTag);
            }
        }
    }
 // once user selected disabled all options
 for (i=0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
}
next_btn.classList.add("show");

} 
// function showResult
function showResult(){
    info_box.classList.remove("activeInfo");  //hide the info box
    quiz_box.classList.remove("activeQuiz");  //hide the quiz box
    result_box.classList.add("activeResult");  //show the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 5){  //if user scored more than 5 right answers
        let scoreTag = '<p>and good! You got <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){  //if user got more than 1 right answers
        let scoreTag = '<p>and nice, You got <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
    else{  // if user scored less than 1 right asnwer
        let scoreTag ='<p>and sorry, You got only <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
}

// timer
function startTimer(time){
    timeCount.textContent = time;
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time --; //decrement the time value
        if(time <9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            const allOptions = option_list.children.length;

            for (i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}
// timerLine
function startTimerLine(time){
    counterLine = setInterval(timer, 200);
    function timer(){
        time += 1;
        time_line.style.width = time + `%`;
        if(time > 99){
            clearInterval(counterLine);
        }
    }
}

// creating a new span tag and passing the question number and total question
function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag; //adding new span tag inside the bottom_ques_counter
}