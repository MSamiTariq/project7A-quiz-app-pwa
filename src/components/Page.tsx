import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuestionState, fetchQuizQuestions, Difficulty } from '../API';
import Loading from '../Loading';
import { gState } from './UserData';
import Button from '@material-ui/core/Button';
import ScoreCard from './ScoreCard';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;


const Page: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [answerObject, setAnswerObject] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([])

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await (fetchQuizQuestions(gState.number, gState.difficulty, gState.category));
    setQuestions(newQuestions);
    setScore(0);
    setQuestionNumber(0);
    setAnswerObject([]);
    setLoading(false);

  }
  const startAgain = () => {
    window.location.reload();
  }

  const checkAns = async (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[questionNumber].correct_answer === answer
      if (correct) setScore(prev => prev + 1)
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setAnswerObject(prev => [...prev, answerObject])
    }
    console.log(answerObject.length, gState.number)
  }

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === gState.number) { setGameOver(true) }
    else setQuestionNumber(nextQ)
  }

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <div>
        <h1>React Quiz</h1>
        {(gameOver) ? (
          <Button onClick={startTrivia} variant= 'outlined' color= 'primary' size = 'large'>Start Quiz</Button>) : null}
        {!gameOver && answerObject.length !== Number(gState.number) ? <p>Score: {score}</p> : null}
        {!gameOver && !loading && answerObject.length !== Number(gState.number) &&
          (<div
            data-aos="flip-left"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <QuestionCard
              questionNumber={questionNumber + 1}
              totalQuestions={gState.number}
              userAnswer={answerObject ? answerObject[questionNumber] : null}
              question={questions[questionNumber].question}
              answers={questions[questionNumber].answer}
              callback={checkAns}
            />
          </div>)
        }
        {!gameOver && !loading && answerObject.length === questionNumber + 1 && questionNumber !== gState.number - 1 &&
          <Button variant="contained" style={{ marginTop: '20px' }} onClick={nextQuestion}>Next</Button>}
        {answerObject.length === Number(gState.number) ? (
          <div
          data-aos="flip-left"
          data-aos-offset="200"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          >
            <ScoreCard
              Total={gState.number}
              Score={score}
            />
            <Button variant="contained" onClick={startAgain}>Try Again</Button>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Page;
