import React, { useState } from "react";
import '../App.css';

const categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 17, name: 'Science & Nature' },
    { id: 23, name: 'History' },
    { id: 21, name: 'Sports' }
];

export default function HomeForm({ onSubmit }) {
    const [formData, setFormData] = useState({ name: '', category: '', difficulty: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.difficulty) {
            setError('All fields are required.');
            return;
        }
        setError('');
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Trivia Challenge</h1>
            <p className="text-gray-600">
                Enter your name, choose a category and difficulty level, and click "Start Quiz" to begin.
            </p>

            <label className="block">
                First Name:
                <input
                    type="text"
                    name="name"
                    className="border p-2 w-full"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label className="block">
                Category:
                <select
                    name="category"
                    className="border p-2 w-full"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">--Select Category--</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </label>
            <label className="block">
                Difficulty:
                <select
                    name="difficulty"
                    className="border p-2 w-full"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option value="">--Select Difficulty--</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Start Quiz</button>
        </form>
    );
}