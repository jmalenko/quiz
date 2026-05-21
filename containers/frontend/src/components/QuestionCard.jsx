import AnswerButton from './AnswerButton';

function QuestionCard({ question, onSelect, disabled }) {
  return (
    <div className="question-card">
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <AnswerButton
            key={option}
            text={option}
            index={index}
            onClick={() => onSelect(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
