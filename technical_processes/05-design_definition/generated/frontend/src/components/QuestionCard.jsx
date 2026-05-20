import AnswerButton from './AnswerButton';

function QuestionCard({ question, onSelect, disabled, selectedOption, feedback }) {
    return (
        <div className="question-card">
            <h2>{question.text}</h2>
            <div className="options">
                {question.options.map((text, index) => (
                    <AnswerButton
                        key={index}
                        text={text}
                        index={index}
                        selected={selectedOption === index}
                        correct={feedback && feedback.correctOption === index}
                        wrong={feedback && selectedOption === index && !feedback.correct}
                        onClick={() => !disabled && onSelect(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
