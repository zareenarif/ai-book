import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title?: string;
}

export default function QuizComponent({
  questions,
  title = 'Quiz',
}: QuizComponentProps): JSX.Element {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: optionIndex,
      });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="not-prose my-8 bg-white dark:bg-gray-900 border-2 border-accent-300 dark:border-accent-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">
          📝 {title}
        </h3>
        {showResults && (
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {score}/{questions.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {percentage}% correct
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const isAnswered = selectedAnswers[question.id] !== undefined;
          const isCorrect = selectedAnswers[question.id] === question.correctAnswer;

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border-2 ${
                showResults
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {qIndex + 1}. {question.question}
              </p>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[question.id] === optionIndex;
                  const isCorrectOption = optionIndex === question.correctAnswer;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, optionIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded border-2 transition-all ${
                        showResults
                          ? isCorrectOption
                            ? 'border-green-500 bg-green-100 dark:bg-green-900/30 font-semibold'
                            : isSelected
                            ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                            : 'border-gray-300 dark:border-gray-700 opacity-50'
                          : isSelected
                          ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/30'
                          : 'border-gray-300 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="flex items-center">
                        <span className="mr-3">
                          {showResults && isCorrectOption && '✓'}
                          {showResults && isSelected && !isCorrectOption && '✗'}
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        {!showResults ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
