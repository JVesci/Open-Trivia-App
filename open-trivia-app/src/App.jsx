import React, { useState } from "react";
import HomeForm from "./components/HomeForm";
import QuestionForm from './components/QuestionForm';
import Result from "./components/Result";
import { fetchTriviaQuestion } from './utils/api';
import './App.css';

export default function App() {
  const [step, setStep] = useState('home');
  const [userInfo, setUserInfo] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [error, setError] = useState('');

  const handleStartQuiz = async (formData) => {
    setUserInfo(formData);
    try {
      const data = await fetchTriviaQuestion(formData);
      setQuestionData(data);
      setStep('question');
    } catch (err) {
      setError('Failed to fetch question. Please try again.');
    }
  };

  const handleAnswerSubmit = (selected) => {
    const correct = selected === questionData.correct_answer;
    setIsCorrect(correct);
    setStep('result');
  };

  const handleRestart = () => {
    setUserInfo(null);
    setQuestionData(null);
    setIsCorrect(null);
    setError('');
    setStep('home');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {step === 'home' && <HomeForm onSubmit={handleStartQuiz} />}
      {step === 'question' && questionData && (
        <QuestionForm
          userInfo={userInfo}
          questionData={questionData}
          onSubmit={handleAnswerSubmit}
          error={error}
        />
      )}
      {step === 'result' && (
        <Result
          userInfo={userInfo}
          isCorrect={isCorrect}
          correctAnswer={questionData.correct_answer}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}