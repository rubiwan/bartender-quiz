"use client"

import { useState } from "react"
import QuizStart from "./quiz-start"
import QuizQuestion from "./quiz-question"
import QuizResults from "./quiz-results"
import questionsData from "@/data/questions.json"

export type Question = {
  id: number
  question: string
  options: string[]
  correct_letter: string
  correct_index: number
}

export type QuizState = "start" | "quiz" | "results"

export default function QuizApp() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)

  const allQuestions = questionsData as Question[]

  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 20)
    setSelectedQuestions(selected)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setScore(0)
    setQuizState("quiz")
  }

  const startAllQuiz = () => {
    setSelectedQuestions(allQuestions)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setScore(0)
    setQuizState("quiz")
  }

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correct_index

    setUserAnswers(prev => [...prev, answerIndex])
    if (isCorrect) setScore(prev => prev + 1)

    // Avanzar o terminar
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setQuizState("results")
    }
  }

  const finishQuiz = () => {
    setQuizState("results")
  }

  const exitQuiz = () => {
    setQuizState("start")
    setSelectedQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setScore(0)
  }

  return (
      <div className="min-h-screen bg-background">
        {quizState === "start" && (
            <QuizStart onStart={startQuiz} onStartAll={startAllQuiz} />
        )}

        {quizState === "quiz" && selectedQuestions.length > 0 && (
            <QuizQuestion
                question={selectedQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={selectedQuestions.length}
                onAnswer={handleAnswer}
                onFinish={finishQuiz}   // ← ahora sí
                onExit={exitQuiz}       // ← ahora sí
            />
        )}

        {quizState === "results" && (
            <QuizResults
                score={score}
                totalQuestions={selectedQuestions.length}
                questions={selectedQuestions}
                userAnswers={userAnswers}
                onRestart={exitQuiz}
            />
        )}
      </div>
  )
}
