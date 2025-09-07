"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Video, VideoOff, Play, Square, RotateCcw } from "lucide-react"

interface InterviewQuestion {
  id: string
  question: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeLimit: number
}

export function SmartInterviewSimulator() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: "1",
      question: "Please introduce yourself and tell us why you're interested in this program.",
      category: "Personal Background",
      difficulty: "Easy",
      timeLimit: 120,
    },
    {
      id: "2",
      question: "Describe a challenging project you've worked on and how you overcame the difficulties.",
      category: "Problem Solving",
      difficulty: "Medium",
      timeLimit: 180,
    },
    {
      id: "3",
      question: "Where do you see yourself in 5 years, and how will this program help you achieve your goals?",
      category: "Career Goals",
      difficulty: "Medium",
      timeLimit: 150,
    },
    {
      id: "4",
      question: "Explain a complex technical concept to someone without a technical background.",
      category: "Communication",
      difficulty: "Hard",
      timeLimit: 120,
    },
  ]

  useEffect(() => {
    if (currentQuestion && timeLeft > 0 && isRecording) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRecording) {
      handleStopRecording()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeLeft, isRecording, currentQuestion])

  const startInterview = () => {
    setCurrentQuestion(interviewQuestions[0])
    setQuestionIndex(0)
    setTimeLeft(interviewQuestions[0].timeLimit)
    setFeedback(null)
  }

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled,
      })

      if (videoRef.current && isVideoEnabled) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setIsRecording(true)
      setTimeLeft(currentQuestion?.timeLimit || 120)
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsAnalyzing(true)

      // 模拟AI分析过程
      setTimeout(() => {
        const mockFeedback = {
          overallScore: Math.floor(Math.random() * 30) + 70,
          categories: {
            clarity: Math.floor(Math.random() * 20) + 80,
            confidence: Math.floor(Math.random() * 25) + 75,
            content: Math.floor(Math.random() * 20) + 80,
            timing: timeLeft > 10 ? 90 : 60,
          },
          suggestions: [
            "语速适中，表达清晰",
            "可以增加更多具体的例子来支持观点",
            "眼神交流良好，展现了自信",
            "建议在回答时更好地控制时间",
          ],
          transcript: "Thank you for the question. I'm very interested in this program because...",
        }
        setFeedback(mockFeedback)
        setIsAnalyzing(false)
      }, 3000)
    }
  }

  const nextQuestion = () => {
    if (questionIndex < interviewQuestions.length - 1) {
      const nextIndex = questionIndex + 1
      setQuestionIndex(nextIndex)
      setCurrentQuestion(interviewQuestions[nextIndex])
      setTimeLeft(interviewQuestions[nextIndex].timeLimit)
      setFeedback(null)
    }
  }

  const resetInterview = () => {
    setCurrentQuestion(null)
    setQuestionIndex(0)
    setTimeLeft(0)
    setIsRecording(false)
    setFeedback(null)
    setIsAnalyzing(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            AI模拟面试系统
          </CardTitle>
          <CardDescription>使用AI技术分析你的面试表现，提供实时反馈和改进建议</CardDescription>
        </CardHeader>
        <CardContent>
          {!currentQuestion ? (
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">准备开始模拟面试</h3>
                <p className="text-muted-foreground">
                  我们将为你提供 {interviewQuestions.length} 个常见面试问题，AI将分析你的回答并提供反馈
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isVideoEnabled ? "default" : "outline"}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? <Video className="h-4 w-4 mr-2" /> : <VideoOff className="h-4 w-4 mr-2" />}
                  视频
                </Button>
                <Button
                  variant={isAudioEnabled ? "default" : "outline"}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                  音频
                </Button>
              </div>

              <Button onClick={startInterview} size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="h-4 w-4 mr-2" />
                开始面试
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 问题显示 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      问题 {questionIndex + 1}/{interviewQuestions.length}
                    </Badge>
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge variant="secondary">{currentQuestion.category}</Badge>
                  </div>
                  <div className="text-lg font-mono">{formatTime(timeLeft)}</div>
                </div>

                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
                  </CardContent>
                </Card>
              </div>

              {/* 视频预览 */}
              {isVideoEnabled && (
                <div className="flex justify-center">
                  <video ref={videoRef} autoPlay muted className="w-64 h-48 bg-black rounded-lg" />
                </div>
              )}

              {/* 录制控制 */}
              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <Button onClick={handleStartRecording} size="lg" className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    开始回答
                  </Button>
                ) : (
                  <Button onClick={handleStopRecording} size="lg" variant="destructive">
                    <Square className="h-4 w-4 mr-2" />
                    结束回答
                  </Button>
                )}

                <Button onClick={resetInterview} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重新开始
                </Button>
              </div>

              {/* 时间进度条 */}
              {isRecording && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>回答进度</span>
                    <span>
                      {formatTime(currentQuestion.timeLimit - timeLeft)} / {formatTime(currentQuestion.timeLimit)}
                    </span>
                  </div>
                  <Progress
                    value={((currentQuestion.timeLimit - timeLeft) / currentQuestion.timeLimit) * 100}
                    className="h-2"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI分析中 */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p>AI正在分析你的回答...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI反馈结果 */}
      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle>AI分析反馈</CardTitle>
            <CardDescription>基于语音识别、表情分析和内容理解的综合评估</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 总体评分 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{feedback.overallScore}</div>
              <div className="text-muted-foreground">总体评分</div>
            </div>

            {/* 分类评分 */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(feedback.categories).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize">{category}</span>
                    <span className="font-semibold">{score as number}/100</span>
                  </div>
                  <Progress value={score as number} className="h-2" />
                </div>
              ))}
            </div>

            {/* 改进建议 */}
            <div className="space-y-2">
              <h4 className="font-semibold">改进建议</h4>
              <ul className="space-y-1">
                {feedback.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              {questionIndex < interviewQuestions.length - 1 && <Button onClick={nextQuestion}>下一题</Button>}
              <Button variant="outline">保存反馈</Button>
              <Button variant="outline">分享结果</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
