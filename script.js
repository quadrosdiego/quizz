const questions = [
    { question: "Qual é a capital da França?", answers: ["Paris", "Londres", "Berlim", "Madri"], correct: 0 },
    { question: "Qual é o maior planeta do sistema solar?", answers: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2 },
    { question: "Quem escreveu 'Dom Quixote'?", answers: ["Miguel de Cervantes", "William Shakespeare", "Jorge Luis Borges", "Gabriel García Márquez"], correct: 0 },
    { question: "Qual é o elemento químico com símbolo 'O'?", answers: ["Ouro", "Oxigênio", "Odin", "Osmio"], correct: 1 },
    { question: "Qual é o resultado de 7 x 8?", answers: ["54", "56", "58", "60"], correct: 1 },
    { question: "Qual é o maior oceano do mundo?", answers: ["Atlântico", "Índico", "Ártico", "Pacífico"], correct: 3 },
    { question: "Em que ano o homem pisou na Lua pela primeira vez?", answers: ["1965", "1969", "1972", "1980"], correct: 1 },
    { question: "Qual é o menor país do mundo?", answers: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"], correct: 1 },
    { question: "Qual é a fórmula química da água?", answers: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
    { question: "Qual é o planeta conhecido como o 'Planeta Vermelho'?", answers: ["Marte", "Vênus", "Mercúrio", "Urano"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 15;

function showQuestion() {
    const questionContainer = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    const timerCount = document.getElementById('timer-count');
    const timerBar = document.getElementById('timer-bar');
    
    clearTimeout(timer);

    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });

    feedback.classList.add('hidden');
    nextButton.classList.add('hidden');
    
    timeRemaining = 15;
    timerCount.textContent = timeRemaining;
    timerBar.style.width = '100%';
    startTimer();
}

function startTimer() {
    const timerCount = document.getElementById('timer-count');
    const timerBar = document.getElementById('timer-bar');
    
    timer = setInterval(() => {
        timeRemaining--;
        timerCount.textContent = timeRemaining;
        timerBar.style.width = `${(timeRemaining / 15) * 100}%`;
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showFeedback(false);
        }
    }, 1000);
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    
    if (isCorrect) {
        feedback.textContent = "Resposta correta!";
        feedback.className = 'correct';
        score++;
    } else {
        feedback.textContent = "Resposta errada!";
        feedback.className = 'incorrect';
    }
    
    feedback.classList.remove('hidden');
    nextButton.classList.remove('hidden');
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    clearInterval(timer);
    
    if (selectedIndex === question.correct) {
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

document.getElementById('next-button').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2>Quiz Concluído!</h2>
        <p>Sua pontuação é ${score} de ${questions.length}.</p>
        <button onclick="location.reload()">Reiniciar Quiz</button>
    `;
}

showQuestion();
