function AnswerButton({ text, onClick, disabled }) {
  return (
    <button
      type="button"
      className="answer-button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default AnswerButton;
