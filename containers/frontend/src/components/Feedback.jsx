function Feedback({ correct, correctOption, onNext }) {
  return (
    <div className={`feedback ${correct ? 'correct' : 'wrong'}`}>
      <p>
        {correct
          ? 'Correct!'
          : `Wrong — the correct answer was option ${correctOption + 1}`}
      </p>
      <button type="button" onClick={onNext}>Next</button>
    </div>
  );
}

export default Feedback;
