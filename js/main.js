// script.js
let questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      type: "choice"
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      answer: "Paris",
      type: "choice"
    },
    {
      question: "What is the color of the sky?",
      answer: "Blue",
      type: "text"
    }
  ];
  
  const startButton = document.getElementById('start-btn');
  const submitButton = document.getElementById('submit-btn');
  const questionsContainer = document.getElementById('questions-container');
  const resultContainer = document.getElementById('result-container');
  const addQuestionButton = document.getElementById('add-question-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    let questionHTML = `<div class="question">${question.question}</div>`;
    if(question.type === "choice") {
      let optionsHTML = '';
      question.options.forEach(option => {
        optionsHTML += `<label><input type="radio" name="answer" value="${option}">${option}</label><br>`;
      });
      questionHTML += optionsHTML;
    } else {
      questionHTML += `<input type="text" name="answer-text">`;
    }
    questionsContainer.innerHTML = questionHTML;
  }
  
  startButton.addEventListener('click', () => {
    displayQuestion();
    startButton.classList.add('hidden');
    submitButton.classList.remove('hidden');
    questionsContainer.classList.remove('hidden');
  });
  
  submitButton.addEventListener('click', () => {
    const userAnswer = document.querySelector('input[name="answer"]:checked') || document.querySelector('input[name="answer-text"]');
    if (userAnswer) {
      const userAnswerValue = userAnswer.value.trim().toLowerCase();
      const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
      if (userAnswerValue === correctAnswer) {
        score++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        showResult();
      }
    } else {
      alert("Please provide an answer.");
    }
  });
  
  function showResult() {
    questionsContainer.classList.add('hidden');
    submitButton.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `<p>Your score: ${score} out of ${questions.length}</p>`;
  }
  
  addQuestionButton.addEventListener('click', () => {
    const newQuestion = prompt("Enter the new question:");
    const type = prompt("Enter the type of question (choice/text):").toLowerCase();
    if(type === "choice") {
      const options = prompt("Enter the options separated by commas (e.g., Option 1, Option 2, Option 3):").split(',').map(option => option.trim());
      const answer = prompt("Enter the correct answer:");
      questions.push({ question: newQuestion, options, answer, type: "choice" });
    } else if(type === "text") {
      const answer = prompt("Enter the correct answer:");
      questions.push({ question: newQuestion, answer, type: "text" });
    } else {
      alert("Invalid question type. Please enter 'choice' or 'text'.");
    }
  });
