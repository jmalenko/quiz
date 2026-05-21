function ScoreSummary({ score, total }) {
  return (
    <div className="score-summary">
      <h1>Quiz Complete!</h1>
      <p>
        You got
        {' '}
        {score}
        {' '}
        out of
        {' '}
        {total}
      </p>
    </div>
  );
}

export default ScoreSummary;
