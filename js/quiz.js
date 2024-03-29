    
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const skipper = document.getElementById("skip");
const progressBarFull = document.getElementById("progressBarFull");

let presentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];



//array of questions

var questions = [                                                           
    {
        question: "What is 10/2?",
        choice1: '3',
        choice2: '5',
        choice3: '10',
        choice4: '4',
        answer: 2
    },
    {
        question: "What is 4x3?",
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '12',
        answer: 4
    },
    {
        question: "What is 3+2?",
        choice1: '3',
        choice2: '5',
        choice3: '10',
        choice4: '4',
        answer: 2
    },
    {
        question: "What is 49-4?",
        choice1: '44',
        choice2: '41',
        choice3: '48',
        choice4: '45',
        answer: 4
    },
    {
        question: "What is 103x3?",
        choice1: '311',
        choice2: '309',
        choice3: '297',
        choice4: '408',
        answer: 2
    },
    {
        question: "What is 14x14?",
        choice1: '169',
        choice2: '196',
        choice3: '129',
        choice4: 'None of the above',
        answer: 2
    },
    {
        question: "What is the remainder of 17/3?",
        choice1: '2',
        choice2: '5',
        choice3: '1',
        choice4: '4',
        answer: 1
    },
    {
        question: "What is 12/8?",
        choice1: '1.2',
        choice2: '1.3',
        choice3: '1.4',
        choice4: '1.5',
        answer: 4
    },
    {
        question: "What is 1001+2100?",
        choice1: '3301',
        choice2: '2101',
        choice3: '3101',
        choice4: '2999',
        answer: 3
    },
    {
        question: "What is 11x11 = 121 ?",
        choice1: 'Yes',
        choice2: 'No',
        choice3: 'Maybe',
        choice4: 'None of the above',
        answer: 1
    }
    
];

//end of array of questions


const INCORRECT_BONUS = -5;                                                       //CONSTANTS
const CORRECT_BONUS = 10;                                                       //CONSTANTS
const MAX_QUESTIONS = 10;                                                       //CONSTANTS
const SKIP_SCORE = 0;


startGame = () => {
  questionCounter = 0;                                                          //initializations
  score = 0;
  availableQuesions = [...questions];                                           //duplicate the questions array for use
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {     //check for max- limit reached
    //go to the landing page
   // questionCounterText.innerText = `${MAX_QUESTIONS}/${MAX_QUESTIONS}`;
    skipper.disabled = true;
    question.innerText = `The test has ended...Redirecting to homepage`;
    choices.forEach(choice => {                                                   //coupling together choice from js to choice in html
    
    choice.innerText = '-';
  });
    
    setTimeout(() => {
      window.location="index.html";
     return window.location;
    }, 4000);
    
  }
  questionCounter++;
  questionCounterText.innerText = `Question: ${questionCounter} of ${MAX_QUESTIONS}`;        //display counter

  progressBarFull.style.width = `${((questionCounter-1)/MAX_QUESTIONS) * 100}%`                                                                                            //update Progress bar


    
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);   //pick randomly 10 question from a set of available questions
  presentQuestion = availableQuesions[questionIndex];
  question.innerText = presentQuestion.question;

  choices.forEach(choice => {                                                   //coupling together choice from js to choice in html
    const number = choice.dataset["number"];
    choice.innerText = presentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);                                   //remove the question that has been displayed in the past
  acceptingAnswers = true;
};

skipper.addEventListener("click", e => {

  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {     //check for max- limit reached
    //go to the landing page
   // questionCounterText.innerText = `Question: ${MAX_QUESTIONS} of ${MAX_QUESTIONS}`;
    skipper.disabled = true;
    question.innerText = `The test has ended...Redirecting to homepage`;
    choices.forEach(choice => {                                                   //coupling together choice from js to choice in html
    
    choice.innerText = '-';
  });
    
    setTimeout(() => {
     window.location="index.html";
     return window.location;
    }, 4000);
    
  }
    
    incrementScore(SKIP_SCORE);
    questionCounter++;
    questionCounterText.innerText = `Question: ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${((questionCounter-1)/MAX_QUESTIONS) * 100}%`         //fill progress bar

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);   //pick randomly 10 question from a set of available questions
  presentQuestion = availableQuesions[questionIndex];
  question.innerText = presentQuestion.question;

  choices.forEach(choice => {                                                   //coupling together choice from js to choice in html
    const number = choice.dataset["number"];
    choice.innerText = presentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);                                   //remove the question that has been displayed in the past
  acceptingAnswers = true;

  });


choices.forEach(choice => {                                                      //Take answers from user...
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;                                                   //initially set for user
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == presentQuestion.answer ? "correct" : "incorrect";        //ternery operator for correct/incorrect

    if (classToApply === "correct") {                                            //update score!!!
      incrementScore(CORRECT_BONUS);
    }

    if (classToApply === "incorrect") {                                            //update score!!!
      incrementScore(INCORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);                   //display contents


    //Timeout/Delay for question to switch...

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    //end Delay

  });
});



incrementScore = num => {                                                        // Keep tack of Score and updating
  score += num;
  scoreText.innerText = score;
};

startGame();