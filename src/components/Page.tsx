import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuestionState, fetchQuizQuestions, Difficulty } from '../API';
import Loading from '../Loading';

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
    const newQuestions = await (fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY));
    setQuestions(newQuestions);
    setScore(0);
    setQuestionNumber(0);
    setAnswerObject([]);
    setLoading(false);

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
      console.log(answer)
    }
  }

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === TOTAL_QUESTION) setGameOver(true)
    else setQuestionNumber(nextQ)
  }
  
  if(loading){
      return <Loading/>
  }
  else{
      return(
        <div>
      <h1>React Quiz</h1>
      {gameOver || answerObject.length === TOTAL_QUESTION ?(
        <button onClick={startTrivia}>Start Quiz</button> ): null}
      {!gameOver ? <p>Score: {score}</p> : null}
      {!gameOver && !loading &&
        (<QuestionCard
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTION}
          userAnswer={answerObject ? answerObject[questionNumber] : null}
          question={questions[questionNumber].question}
          answers={questions[questionNumber].answer}
          callback={checkAns}
        />)
      }
      {!gameOver && !loading && answerObject.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTION - 1 &&
      <button onClick= {nextQuestion}>Next</button>}
      </div>
      )
  }
}

export default Page;
