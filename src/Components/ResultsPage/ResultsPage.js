import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { correctAnswers, totalQuestions } = state;

  const isWinner = correctAnswers > 5;
  const percentage = ((correctAnswers / totalQuestions) * 100); 

  const handleReportClick = () => {
    navigate('/report', { state });
  };

  return (
    <div className="result-container">
      <div className="results-page-container">
        <div
          className={`results-content ${
            isWinner ? 'winner-content' : 'loser-content'
          }`}
        >
          <h1>
            {isWinner ? 'Congratulations! 🎉 You Won!' : 'Oops! You Lost 😞'}
          </h1>
          <img
            src={
              isWinner
                ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png'
            }
            alt={isWinner ? 'won' : 'lost'}
            className="results-image"
          />
          <p className="percentage">{percentage}% Correctly Answered</p>
          <p>
            You answered {correctAnswers} out of {totalQuestions} questions
            correctly.
          </p>
          <button className="report-button" onClick={handleReportClick}>
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
