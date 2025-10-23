"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GlassWater, Trophy, BookOpen } from "lucide-react"

interface QuizStartProps {
  onStart: () => void
  onStartAll?: () => void
}

export default function QuizStart({ onStart, onStartAll }: QuizStartProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <GlassWater className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-balance pt-2">Bartender Quiz</h1>

          <p className="text-lg text-muted-foreground text-pretty pt-2 text-justify">
            Test your bartending knowledge with our random questions quiz. Choose between 20 questions or all questions.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <BookOpen className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">20 Questions</h3>
              <p className="text-sm text-muted-foreground">
                Each quiz randomly selects 20 questions to test your skills
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <Trophy className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Track Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                See your final score and review correct answers at the end
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onStart} size="lg" className="flex-1 text-lg h-14" variant="outline">
            Start Random Quiz
          </Button>

          <Button
              onClick={onStartAll ?? onStart}
              size="lg"
              variant="outline"
              className="flex-1 text-lg h-14"
          >
            Start All Questions
          </Button>
        </div>
      </Card>
    </div>
  )
}
