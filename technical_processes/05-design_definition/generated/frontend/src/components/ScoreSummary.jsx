function ScoreSummary({ score, total }) {
    return (
        <div className="score-summary">
            <h2>Quiz Complete!</h2>
            <p>{score} / {total} correct</p>
        </div>
    );
}

export default ScoreSummary;
