import React from "react";
import '../App.css';

export default function Result({ userInfo, isCorrect, correctAnswer, onRestart }) {
    return (
        <div className="space-y-4">
            {isCorrect ? (
                <h2 className="text-xl font-bold text-green-600">
                    Great job, {userInfo.name}! You got it right!
                </h2>
            ) : (
                <>
                    <h2 className="text-xl font-bold text-red-600">
                        Sorry, {userInfo.name}. That was incorrect.
                    </h2>
                    <p>The correct answer was: <strong>{correctAnswer}</strong></p>
                </>
            )}
            <button onClick={onRestart} className="bg-blue-600 text-white px-4 py-2 rounded">
                Try Another Question
            </button>
        </div>
    );
}