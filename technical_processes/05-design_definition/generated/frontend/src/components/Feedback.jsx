function Feedback({ correct, correctOption, onNext }) {
    return (
        <div className={`feedback ${correct ? 'correct' : 'wrong'}`}>
            <p>{correct ? '✓ Correct!' : '✗ Wrong!'}</p>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default Feedback;
