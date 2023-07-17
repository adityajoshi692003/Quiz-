const questions = [
    {
        question: "Which is the largest continent in the world ?",
        answer: [
            { text : "Europe", correct: false},
            { text : "Africa", correct: false},
            { text : "Asia", correct: true},
            { text : "America", correct: false},
        ]
    },
    {
        
        question: "Where is the largest cricket stadium in the world ?",
        answer: [
            { text : "Spain", correct: false},
            { text : "India", correct: true},
            { text : "New Zealand", correct: false},
            { text : "England", correct: false},
        ]
    },
    {
        
        question: "Which is the largest desert amongst the following ?",
        answer: [
            { text : "Gobi", correct: false},
            { text : "Sahara", correct: true},
            { text : "Thar", correct: false},
            { text : "Kalahari", correct: false},
        ]
    },
    {
        
        question: "Where is the largest ocean in the world ?",
        answer: [
            { text : "Atlantic", correct: false},
            { text : "Artic", correct: false},
            { text : "Indian", correct: false},
            { text : "Pacific", correct: true},
        ]
    },
    {
        
        question: "Which is the largest planet in the Universe ?",
        answer: [
            { text : "Mars", correct: false},
            { text : "Jupiter", correct: true},
            { text : "Uranus", correct: false},
            { text : "Saturn", correct: false},
        ]
    },
]
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handlNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handlNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();