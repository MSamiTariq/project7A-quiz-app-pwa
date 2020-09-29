import React from 'react';

type Props = {
    Total: number,
    Score: number,
}

const ScoreCard: React.FC<Props> = ({Total, Score}) => {
    const Per = (Score/Total*100).toFixed(2)

    return(
        <div>
            <h1>ScoreCard</h1>
            <h3>Total Questions: {Total}</h3>
            <h3>Score: {Score}</h3>
            <h3>Percentage: {Per} %</h3>
        </div>
    )
}

export default ScoreCard;