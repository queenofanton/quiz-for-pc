// Quiz Questions
const quizQuestions = [
    {
        question: "When was our first date?",
        answers: [
            { text: "May 14", correct: true },
            { text: "May 13", correct: false },
            { text: "May 15", correct: false }
        ]
    },
    {
        question: "Where did we go?",
        answers: [
            { text: "KAI Bar", correct: false },
            { text: "ACID Cafe", correct: false },
            { text: "738 KREMA Concept Store & Coffee", correct: true }
        ]
    },
    {
        question: "Which restaurant did I take you to after we met up at Schönhauser Allee after my therapy?",
        answers: [
            { text: "YSY", correct: false },
            { text: "Que", correct: false },
            { text: "KINK Bar & Restaurant", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showPage('quizPage');
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question number and progress
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Clear feedback message
    document.getElementById('feedbackMessage').textContent = '';
    document.getElementById('feedbackMessage').className = 'feedback';
    
    // Render answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => checkAnswer(index, answer.correct);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(index, isCorrect) {
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    // Mark the selected answer
    if (isCorrect) {
        buttons[index].classList.add('correct');
        document.getElementById('feedbackMessage').textContent = '✓ Correct!';
        document.getElementById('feedbackMessage').classList.add('correct');
        correctAnswers++;
        
        // Move to next question after 1.5 seconds
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }, 1500);
    } else {
        buttons[index].classList.add('incorrect');
        document.getElementById('feedbackMessage').textContent = '✗ Incorrect. Try again!';
        document.getElementById('feedbackMessage').classList.add('incorrect');
        
        // Highlight correct answer
        const correctIndex = quizQuestions[currentQuestionIndex].answers.findIndex(a => a.correct);
        buttons[correctIndex].classList.add('correct');
        
        // Move to next question after 2 seconds
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }, 2000);
    }
}

function showResults() {
    document.getElementById('correctCount').textContent = correctAnswers;
    showPage('resultsPage');
}

function goToCongratsPage() {
    showPage('congratsPage');
    startConfetti();
}

function restartQuiz() {
    showPage('startPage');
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#667eea', '#764ba2', '#f44336', '#4caf50', '#2196F3', '#FF9800'];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -10,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            opacity: Math.random() * 0.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 7 + 5,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.1 - 0.05
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let hasConfetti = false;
        
        confettiPieces.forEach((piece, index) => {
            if (piece.y < canvas.height) {
                hasConfetti = true;
                
                // Update position
                piece.x += piece.vx;
                piece.y += piece.vy;
                piece.rotation += piece.rotationSpeed;
                
                // Apply gravity
                piece.vy += 0.1;
                
                // Draw confetti
                ctx.save();
                ctx.globalAlpha = piece.opacity;
                ctx.fillStyle = piece.color;
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation);
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                ctx.restore();
            }
        });
        
        if (hasConfetti) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
