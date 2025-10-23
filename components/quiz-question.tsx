"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Question } from "./quiz-app"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuizQuestionProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (answerIndex: number) => void
  onFinish?: () => void        // ← ya lo tenías
  onExit?: () => void          // ← FALTABA: lo añadimos
}

export default function QuizQuestion({
                                       question,
                                       questionNumber,
                                       totalQuestions,
                                       onAnswer,
                                       onFinish,
                                       onExit,                       // ← recibimos onExit
                                     }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return

    setSelectedAnswer(index)
    setShowFeedback(true)

    // Mostrar feedback 1.5s y luego notificar al padre
    setTimeout(() => {
      onAnswer(index)
      setSelectedAnswer(null)
      setShowFeedback(false)
      // Importante: NO llamamos a onFinish aquí. El padre decide
      // si pasa a results al contestar la última pregunta.
    }, 1500)
  }

  const progress = (questionNumber / totalQuestions) * 100
  const optionLabels = ["A", "B", "C", "D"]

  return (
      <div className="min-h-screen flex flex-col">
        {/* Header with progress */}
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
              <span className="font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex items-center justify-center p-4 py-8">
          <Card className="w-full max-w-2xl p-6 md:p-8 space-y-8">
            <h2 className="text-xl md:text-2xl font-semibold text-balance leading-relaxed">
              {question.question}
            </h2>

            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct_index
                const showCorrect = showFeedback && isCorrect
                const showIncorrect = showFeedback && isSelected && !isCorrect

                return (
                    <Button
                        key={index}
                        variant={
                          showCorrect ? "default" :
                              showIncorrect ? "destructive" :
                                  isSelected ? "secondary" : "outline"
                        }
                        className={`w-full justify-start text-left h-auto py-4 px-4 text-base transition-all ${showFeedback ? "pointer-events-none" : ""}`}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={showFeedback}
                    >
                  <span className="flex items-center gap-3 w-full">
                    <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 font-semibold ${
                            showCorrect
                                ? "bg-primary-foreground text-primary"
                                : showIncorrect
                                    ? "bg-destructive-foreground text-destructive"
                                    : isSelected
                                        ? "bg-secondary-foreground text-secondary"
                                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {optionLabels[index]}
                    </span>
                    <span className="flex-1 text-pretty leading-relaxed">{option}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                    {showIncorrect && <XCircle className="w-6 h-6 shrink-0" />}
                  </span>
                    </Button>
                )
              })}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onExit}>
                Exit
              </Button>
              <Button variant="secondary" onClick={onFinish}>
                Finish Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
  )
}
