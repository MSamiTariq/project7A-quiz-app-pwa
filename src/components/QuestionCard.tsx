import React from 'react';
import { AnswerObject } from './Page';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | null;
    totalQuestions: number;
    questionNumber: number;
}

export const QuestionCard: React.FC<Props> = ({ question, answers, totalQuestions, questionNumber, userAnswer, callback }) => {
    const classes = useStyles();
    return(
    <div>
        <p className="number">
            Question : {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map((answer) => (
                <div className={classes.root}
                    key={answer}
                    // correct={userAnswer?.correctAnswer === answer}
                    // userClicked={userAnswer?.answer === answer}
                    >
                    <Button variant= "outlined" color= "primary" style={{borderRadius: '20px', width: '80%'}} disabled={userAnswer ? true : false} className='options' value={answer} onClick={callback}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Button>
                    </div>
            ))}
        </div>
    </div>)

            }