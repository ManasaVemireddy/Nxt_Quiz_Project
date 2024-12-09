import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import './Quiz.css';



const quizQuestionsApiUrl = 'https://apis.ccbp.in/assess/questions';

class QuizGameRoute extends Component {
  state = {
    isLoading: true,
    quizData: [],
    questionIndex: 0,
    timer: 15,
    selectedOption: null,
    correctOption: null,
    showResult: false,
    correctAnswersCount: 0,
    userAnswers: [],
    hasError: false,
  };

  componentDidMount() {
    this.fetchQuizData();
  }

  fetchQuizData = async () => {
    try {
      const response = await fetch(quizQuestionsApiUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ quizData: data.questions, isLoading: false });
        this.startTimer();
      } else {
        throw new Error('Failed to load questions');
      }
    } catch (error) {
      this.setState({ hasError: true, isLoading: false });
    }
  };

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      } else {
        clearInterval(this.timerInterval);
        this.handleUnattemptedQuestion();
      }
    }, 1000);
  };

  handleUnattemptedQuestion = () => {
    this.setState(
      (prevState) => ({
        userAnswers: [...prevState.userAnswers, null],
        questionIndex: prevState.questionIndex + 1,
      }),
      this.checkNextStep
    );
  };

  stopTimer = () => {
    clearInterval(this.timerInterval);
  };

  handleOptionSelect = (selectedOption) => {
    const { quizData, questionIndex } = this.state;
    const correctOption = quizData[questionIndex].options.find(
      (option) => option.is_correct === 'true'
    ).text;

    const isCorrect = selectedOption === correctOption;

    this.setState((prevState) => ({
      selectedOption,
      correctOption,
      correctAnswersCount: isCorrect
        ? prevState.correctAnswersCount + 1
        : prevState.correctAnswersCount,
      userAnswers: [...prevState.userAnswers, selectedOption],
    }));

    this.stopTimer();
  };

  checkNextStep = () => {
    const { questionIndex, quizData } = this.state;
    if (questionIndex >= quizData.length) {
      this.setState({ showResult: true });
    } else {
      this.setState({ timer: 15, selectedOption: null, correctOption: null });
      this.startTimer();
    }
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }), this.checkNextStep);
  };

  retryQuiz = () => {
    this.setState({
      isLoading: true,
      questionIndex: 0,
      timer: 15,
      selectedOption: null,
      correctOption: null,
      showResult: false,
      correctAnswersCount: 0,
      userAnswers: [],
      hasError: false,
    });
    this.fetchQuizData();
  };

  renderOptions = () => {
    const { quizData, questionIndex, selectedOption, correctOption } = this.state;

    if (!quizData[questionIndex] || !quizData[questionIndex].options) {
      return null;
    }

    const { options } = quizData[questionIndex];

    return (
      <div className="options-container">
        {options.map((option) => {
          const isCorrect = option.text === correctOption;
          const isSelected = option.text === selectedOption;

          const style = isSelected
            ? isCorrect
              ? { backgroundColor: '#1c944b', color: '#fff' }
              : { backgroundColor: '#bf2626', color: '#fff' }
            : isCorrect
            ? { backgroundColor: '#1c944b', color: '#fff' }
            : { backgroundColor: '#f0f0f0', color: '#000' };

          return (
            <div
              key={option.id}
              className="option"
              style={style}
              onClick={() =>
                selectedOption === null && this.handleOptionSelect(option.text)
              }
            >
              <div className="option-text">{option.text}</div>
              {option.image_url && (
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="option-image"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const {
      isLoading,
      hasError,
      showResult,
      quizData,
      questionIndex,
      timer,
      selectedOption,
    } = this.state;

    if (isLoading) {
      return <ThreeDots height={50} width={50} color="#000" visible={true} />;
    }

    if (hasError) {
      return (
        <div className="error-container">
          <p>Something went wrong. Please retry!</p>
          <button onClick={this.retryQuiz}>Retry</button>
        </div>
      );
    }

    if (showResult) {
      return (
        <Navigate
          to="/results"
          replace
          state={{
            correctAnswers: this.state.correctAnswersCount,
            totalQuestions: quizData.length,
            quizData,
            userAnswers: this.state.userAnswers,
          }}
        />
      );
    }

    const question = quizData[questionIndex];

    return (
      <div className="quiz-container-game">
        
        <div className="quiz-container">
          <div className="top-bar">
            <div className="question-number">Question {questionIndex + 1}</div>
            <div className="timer-container">{timer}s</div>
          </div>
          <div className="quiz-question">{question?.question_text}</div>
          {this.renderOptions()}
          <button
            className="next-button"
            disabled={!selectedOption}
            onClick={this.nextQuestion}
          >
            {questionIndex + 1 < quizData.length ? 'Next Question' : 'Submit'}
          </button>
        </div>
      </div>
    );
  }
}

export default QuizGameRoute;
