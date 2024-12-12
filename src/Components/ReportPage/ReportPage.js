import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReportPage.css';

const ReportPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quizData, userAnswers } = state;

  const handleGoBack = () => {
    navigate('/home');
  };

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  // Logic for calculating the counts
  quizData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const correctOption = question.options.find(
      (option) => option.is_correct === 'true'
    ).text;

    if (userAnswer === null) {
      unattemptedCount++;
    } else if (userAnswer === correctOption) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const isAllAttemptedAndCorrect = unattemptedCount === 0 && correctCount === quizData.length;

  return (
    <div className="report-page-container">
      <div className="report-content">
        <h1>Quiz Report</h1>

        {/* If all questions answered perfectly */}
        {isAllAttemptedAndCorrect ? (
          <div className="report1">
            <button className="button1">10/10</button>
            <div className="report-summary">
              <p>
                <img
                  src=""
                  alt="correct-icon"
                  className="summary-icon"
                />
                All questions answered correctly!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div class="report1">
            <button className="button1">10/10</button>
            <div className="report-summary">
              <p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct-icon"
                  className="summary-icon"
                />
                 {correctCount} Correct Answers
              </p>
              <p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect-icon"
                  className="summary-icon"
                />
                {incorrectCount} Incorrect Answers
              </p>
              <p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted-icon"
                  className="summary-icon"
                />
                {unattemptedCount} Unattempted Questions
              </p>
            </div>
            <div/>
            </div>
            {/* If there are unattempted questions */}
            {unattemptedCount > 0 ? (
              <div className="report-table">
                <h3 class="heading1">Unattempted Questions</h3>
                {quizData.map((question, index) => {
                  if (userAnswers[index] === null) {
                    const correctOption = question.options.find(
                      (option) => option.is_correct === 'true'
                    ).text;
                    
                    return (
                      <div>

                       <div key={index} className="report-row">
                        
                        <p>
                          <strong>Question {index + 1}:</strong> {question.question_text}
                        </p>
                        <p style={{ color: 'red' }}>
                          Correct answer: <strong>{correctOption}</strong>
                        </p>
                      </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="all1">No unattempted questions. All questions answered!</p>
            )}
         
          </>
        )}

        {/* Back to Home */}
        <button className="back-button" onClick={handleGoBack}>
          Home
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
