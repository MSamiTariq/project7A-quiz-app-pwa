import React from 'react';
import { AnswerObject } from './Page';


type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | null;
    totalQuestions: number;
    questionNumber: number;
}

export const QuestionCard: React.FC<Props> = ({ question, answers, totalQuestions, questionNumber, userAnswer, callback }) => (
    <div>
        <p className="number">
            Question : {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map((answer) => (
                <div
                    key={answer}
                    // correct={userAnswer?.correctAnswer === answer}
                    // userClicked={userAnswer?.answer === answer}
                    >
                    <button disabled={userAnswer ? true : false} className='options' value={answer} onClick={callback}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
                    </div>
            ))}
        </div>
    </div>

)