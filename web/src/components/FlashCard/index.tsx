import React from "react";
import Card from "../Card";
import CodeHighlight from "../CodeHighlight/CodeHighlight";
import Spoiler from "../Spoiler";

export interface IFlashCard {
  subjectId: number;
  question: string;
  solution: string;
  language?: string;
  code?: string;
}

type Props = {
  flashCard: IFlashCard;
};

const FlashCard: React.FC<Props> = ({ flashCard }) => {
  return (
    <Card>
      <div>
        <h1>{flashCard.question}</h1>
        <Spoiler>{flashCard.solution}</Spoiler>
        {flashCard?.code && flashCard?.language ? (
          <CodeHighlight language={flashCard.language}>
            {flashCard.solution}
          </CodeHighlight>
        ) : null}
      </div>
    </Card>
  );
};

export default FlashCard;
