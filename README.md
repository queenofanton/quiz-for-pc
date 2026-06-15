# AP Quiz

A simple and easy-to-use quiz website for quick knowledge tests.

## Features

- **Start Page**: Introduction with quiz description
- **Interactive Quiz**: 3 sample questions with multiple choice answers
- **Instant Feedback**: Immediate feedback on each answer
- **Progress Tracking**: Visual progress bar showing quiz completion
- **Results Page**: Summary of quiz performance
- **Responsive Design**: Works on desktop and mobile devices

## Questions Included

1. When was our first date?
2. Where did we go?
3. Which restaurant did Beisi take Mia to?

## How to Use

1. Open `index.html` in your web browser
2. Click "Start Quiz" to begin
3. Select an answer for each question
4. Get instant feedback - correct answers move to the next question automatically
5. View your results at the end
6. Click "Retake Quiz" to try again

## File Structure

- `index.html` - Main HTML file with page structure
- `style.css` - Styling for all pages and responsive design
- `script.js` - Quiz logic and functionality

## Customization

To add or modify questions, edit the `quizQuestions` array in `script.js`:

```javascript
const quizQuestions = [
    {
        question: "Your question here?",
        answers: [
            { text: "Option 1", correct: false },
            { text: "Option 2", correct: true },
            { text: "Option 3", correct: false },
            { text: "Option 4", correct: false }
        ]
    }
];
```