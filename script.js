const questions = [
  {
    question: "O que significa 'HTML'?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperloop Machine Language"],
    answer: 0,
    explanation: "HTML significa Hyper Text Markup Language e é usado para estruturar páginas web."
  },
  {
    question: "Qual destes é um tipo de dado em JavaScript?",
    options: ["float", "decimal", "boolean"],
    answer: 2,
    explanation: "Boolean é um tipo de dado lógico usado em JavaScript."
  },
  {
    question: "Qual é a forma correta de declarar uma função em JavaScript?",
    options: ["function myFunc()", "def myFunc()", "fun myFunc()"],
    answer: 0,
    explanation: "Em JavaScript, funções são declaradas com a palavra-chave function."
  },
  {
    question: "Qual destes é um framework de front-end?",
    options: ["Node.js", "React", "Django"],
    answer: 1,
    explanation: "React é um framework JavaScript para construção de interfaces de usuário."
  },
  {
    question: "Qual operador é usado para comparação estrita (valor e tipo) em JavaScript?",
    options: ["==", "===", "="],
    answer: 1,
    explanation: "=== compara valor e tipo, enquanto == compara apenas valor."
  },
  {
    question: "Como você escreve um comentário de uma linha em JavaScript?",
    options: ["// Comentário", "/* Comentário */", "<!-- Comentário -->"],
    answer: 0,
    explanation: "Comentários de uma linha usam // em JavaScript."
  },
  {
    question: "O que é uma variável em programação?",
    options: ["Um número fixo", "Uma forma de armazenar dados", "Um erro no código"],
    answer: 1,
    explanation: "Variáveis armazenam dados temporários em programas."
  },
  {
    question: "CSS é usado para:",
    options: ["Estruturar dados", "Adicionar interatividade", "Estilizar páginas web"],
    answer: 2,
    explanation: "CSS (Cascading Style Sheets) é usado para estilizar páginas web."
  },
  {
    question: "Qual comando exibe algo no console do navegador em JavaScript?",
    options: ["console.show()", "console.log()", "print()"],
    answer: 1,
    explanation: "console.log() é usado para exibir mensagens no console em JavaScript."
  },
  {
    question: "Qual destas linguagens é mais usada para backend?",
    options: ["HTML", "Python", "CSS"],
    answer: 1,
    explanation: "Python é muito utilizado no desenvolvimento backend."
  }
];

let currentQuestion = 0;
let score = 0;
let username = "";
let timer;
let timeLeft = 300;
let wrongAnswers = [];

function startQuiz() {
  username = document.getElementById("username").value;
  if (!username) {
    alert("Por favor, digite seu nome.");
    return;
  }
  document.getElementById("start-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question-text").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(i);
    answersDiv.appendChild(btn);
  });

  timeLeft = 300;
  document.getElementById("timer").innerText = `Tempo restante: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1); // Sem resposta
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timer);
  const question = questions[currentQuestion];
  if (index === question.answer) {
    score++;
  } else {
    wrongAnswers.push({
      question: question.question,
      selected: index !== -1 ? question.options[index] : "Não respondeu",
      correct: question.options[question.answer],
      explanation: question.explanation
    });
  }
  document.querySelector("button[onclick='nextQuestion()']").style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  document.querySelector("button[onclick='nextQuestion()']").style.display = "none";
  loadQuestion();
  startTimer();
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("user-score").innerText = `${username}, você acertou ${score} de ${questions.length} questões.`;

  const expDiv = document.getElementById("explanations");
  expDiv.innerHTML = "<h3>Explicações das questões erradas:</h3>";
  wrongAnswers.forEach(w => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Pergunta:</strong> ${w.question}<br>
    <strong>Sua resposta:</strong> ${w.selected}<br>
    <strong>Correta:</strong> ${w.correct}<br>
    <strong>Explicação:</strong> ${w.explanation}<br><br>`;
    expDiv.appendChild(div);
  });
}
