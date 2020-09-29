import {shuffleArray} from './Util';

export type Question = {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    type: string;
    difficulty: string;
}

export enum Difficulty {
    EASY= 'easy',
    MEDIUM= 'medium',
    HARD= 'hard',
}

export type QuestionState = Question & {answer: string[]};

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty, category: number): Promise<QuestionState[]> => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(url)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answer: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}

export const fetchQuizCategories = async() =>{
    const url = `https://opentdb.com/api_category.php`;
    const data = await (await fetch(url)).json();
    return(
        data.trivia_categories
    )
}