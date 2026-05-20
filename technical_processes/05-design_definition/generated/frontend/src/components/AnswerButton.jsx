function AnswerButton({ text, index, selected, correct, wrong, onClick }) {
    let className = 'answer-button';
    if (correct) className += ' correct';
    if (wrong) className += ' wrong';
    if (selected && !correct && !wrong) className += ' selected';

    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}

export default AnswerButton;
