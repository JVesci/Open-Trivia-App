import React, { useState } from 'react';
import he from 'he';
import '../App.css';

export default function QuestionForm({ userInfo, questionData, onSubmit, error }) {
    const [selected, setSelected] = useState('');
    const [localError, setLocalError] = useState('');

    const options = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) {
            setLocalError('Please select an answer.');
            return;
        }
        setLocalError('');
        onSubmit(selected);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">Hello, {userInfo.name}!</h2>
            <p>{he.decode(questionData.question)}</p>
            {options.map((opt, idx) => (
                <label key={idx} className="block">
                    <input
                        type="radio"
                        name="answer"
                        value={opt}
                        onChange={(e) => setSelected(e.target.value)}
                    />{' '}
                    {he.decode(opt)}
                </label>
            ))}
            {localError && <p className="text-red-500">{localError}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button className="bg-green-500 text-white px-4 py-2 rounded">Submit Answer</button>
        </form>
    );
}