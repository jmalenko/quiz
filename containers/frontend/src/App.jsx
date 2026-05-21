import { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from './api/quizApi';
import QuestionCard from './components/QuestionCard';
import Feedback from './components/Feedback';
import ScoreSummary from './components/ScoreSummary';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleSelect = async (optionIndex) => {
    setSelectedOption(optionIndex);
    const result = await submitAnswer(questions[currentIndex].id, optionIndex);
    setFeedback(result);
    if (result.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  if (finished) {
    return <ScoreSummary score={score} total={questions.length} />;
  }

  return (
    <div className="app">
      <h1>Quiz</h1>
      <p>
        Question
        {' '}
        {currentIndex + 1}
        {' '}
        of
        {' '}
        {questions.length}
      </p>
      <QuestionCard
        question={questions[currentIndex]}
        onSelect={handleSelect}
        disabled={feedback !== null}
      />
      {feedback && (
        <Feedback
          correct={feedback.correct}
          correctOption={feedback.correctOption}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default App;
