import { useState, useEffect } from 'react';
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
        fetch('/api/questions')
            .then(res => res.json())
            .then(setQuestions);
    }, []);

    const handleSelect = async (optionIndex) => {
        setSelectedOption(optionIndex);
        const response = await fetch('/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                questionId: questions[currentIndex].id,
                selectedOption: optionIndex
            })
        });
        const result = await response.json();
        setFeedback(result);
        if (result.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (currentIndex + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrentIndex(i => i + 1);
            setSelectedOption(null);
            setFeedback(null);
        }
    };

    if (questions.length === 0) return <p>Loading...</p>;
    if (finished) return <ScoreSummary score={score} total={questions.length} />;

    return (
        <div className="app">
            <QuestionCard
                question={questions[currentIndex]}
                onSelect={handleSelect}
                disabled={feedback !== null}
                selectedOption={selectedOption}
                feedback={feedback}
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
