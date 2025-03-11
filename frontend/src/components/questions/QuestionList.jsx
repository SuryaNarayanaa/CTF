import React from 'react';
import ScrambleText from '../ui/ScrambleText.jsx'; 

const QuestionList = ({
  questions = [],
  answeredQuestions = {},
  selectedQuestion,
  handleQuestionClick
}) => {
  console.log(answeredQuestions);
  return (
    <>
      <div className="questions-list">
        {questions.map((question) => {
          const isAnswered = answeredQuestions[question._id];
          return (
            <button
              key={question._id}
              onClick={() => handleQuestionClick(question)}
              className={`question-button
                ${isAnswered === true ? 'answered' : ''}
                ${selectedQuestion?._id === question._id ? 'selected' : ''}`}
            >
              <ScrambleText text={question.title} duration={400} interval={20} />
              {question.points && (
                <span className="points">[{question.points} pts]</span>
              )}
            </button>
          );
        })}
      </div>

      {/* -- Stats Section (only show if there are questions) -- */}
      {questions.length > 0 && (
        <div className="stats-section">
          <strong className="stats-title w-full">&gt; Stats</strong>
          <div className="stats-flags">
            {questions.map((question) => {
              const isAnswered = answeredQuestions[question._id];
              if (isAnswered === true) {
                // Solved -> show green flag
                return (
                  <img
                    key={question._id}
                    src="FLAG_LOGO.gif"
                    alt="Solved"
                    className="flag solved-flag"
                  />
                );
              } else if (isAnswered === false) {
                return (
                  <img
                    key={question._id}
                    src="RED_FLAG.gif"
                    alt="Wrong"
                    className="flag wrong-flag"
                  />
                );
              } else {
                return (
                  <span key={question._id} className="flag unsolved-flag">
                    []
                  </span>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionList;
