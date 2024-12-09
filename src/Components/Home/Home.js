import React from 'react'
import { Link, useNavigate } from 'react-router-dom' // Replace useHistory with useNavigate
import Cookies from 'js-cookie'

import './Home.css'

const HomePage = () => {
  const navigate = useNavigate() // useNavigate replaces useHistory

  const isLoggedIn = () => {
    const token = Cookies.get('jwt_token')
    return token !== undefined
  }

  const handleStartQuiz = () => {
    if (isLoggedIn()) {
      navigate('/quiz') // Navigate to quiz page
    } else {
      alert('Please log in to start the quiz.')
      navigate('/login') // Redirect to login
    }
  }

  return (
    <div className="home-container">
      
      <div className="content">
        <div className="quiz-start-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="quiz-img"
            className="quiz-img"
          />
          <h1>How Many Of These Questions Do You Actually Know?</h1>
          <p>Test yourself with these easy quiz questions and answers</p>
          {isLoggedIn() ? (
            <button
              type="button"
              className="start-btn"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          ) : (
            <Link to="/login">
              <button type="button" className="start-btn">
                Login to Start Quiz
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
