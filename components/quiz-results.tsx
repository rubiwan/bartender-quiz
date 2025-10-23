"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Question } from "./quiz-app"
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  questions: Question[]
  userAnswers: number[]
  onRestart: () => void
}

export default function QuizResults({ score, totalQuestions, questions, userAnswers, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { title: "Outstanding!", message: "You're a bartending expert!" }
    if (percentage >= 75) return { title: "Great Job!", message: "You have strong bartending knowledge." }
    if (percentage >= 60) return { title: "Good Effort!", message: "Keep practicing to improve your skills." }
    return { title: "Keep Learning!", message: "Review the material and try again." }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score Card */}
        <Card className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{performance.title}</h1>
            <p className="text-lg text-muted-foreground">{performance.message}</p>
          </div>

          <div className="py-6">
            <div className="text-6xl md:text-7xl font-bold text-primary">
              {score}/{totalQuestions}
            </div>
            <p className="text-xl text-muted-foreground mt-2">{percentage}% Correct</p>
          </div>

          <Button onClick={onRestart} size="lg" className="w-full md:w-auto px-8">
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Another Quiz
          </Button>
        </Card>

        {/* Review Answers */}
        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Review Your Answers</h2>

          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index]
              const isCorrect = userAnswer === question.correct_index
              const optionLabels = ["A", "B", "C", "D"]

              return (
                <div key={question.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-muted-foreground mb-2">Question {index + 1}</p>
                      <p className="font-medium text-lg leading-relaxed mb-4">{question.question}</p>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex
                          const isCorrectAnswer = question.correct_index === optionIndex

                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                isCorrectAnswer
                                  ? "border-primary bg-primary/5"
                                  : isUserAnswer
                                    ? "border-destructive bg-destructive/5"
                                    : "border-transparent bg-muted/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{optionLabels[optionIndex]}.</span>
                                <span className="text-sm">{option}</span>
                                {isCorrectAnswer && (
                                  <span className="ml-auto text-xs font-semibold text-primary">Correct</span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-auto text-xs font-semibold text-destructive">Your answer</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
