import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import FlashCard, { IFlashCard } from "../../components/FlashCard";

import "./ListCards.scss";
import { StyledButton } from "../../components/StyledButton";
import { useParams, useHistory } from "react-router-dom";

const getAllFlashCardsBySubject = /* GraphQL */ `
  query getAllBySubject($subjectId: Int!) {
    getAllBySubject(subjectId: $subjectId) {
      question
      solution
    }
  }
`;

const ListCards = () => {
  const { subjectId } = useParams();
  const [getFlashCardsRes] = useQuery({
    query: getAllFlashCardsBySubject,
    variables: { subjectId: Number(subjectId) }
  });
  const [cards, setCards] = useState<IFlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    if (getFlashCardsRes?.data?.getAllBySubject) {
      setCards(getFlashCardsRes.data.getAllBySubject);
      setLoading(false);
    }
  }, [getFlashCardsRes]);

  const decrement = () => {
    if (currentIndex == 0) return;
    setCurrentIndex(current => current - 1);
  };

  const increment = () => {
    if (currentIndex + 1 > cards.length - 1) return;
    setCurrentIndex(current => current + 1);
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "600px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <StyledButton onClick={decrement}>{`<<`}</StyledButton>
        <div>
          <StyledButton style={{ marginRight: '5px'}} onClick={() => history.push("/")}>GO BACK</StyledButton>
          <StyledButton style={{ marginLeft: '5px'}} onClick={() => history.push("/add")}>ADD</StyledButton>
        </div>

        <StyledButton onClick={increment}>{`>>`}</StyledButton>
      </div>
      {!loading && cards.length != 0 ? (
        <>
          <div className="card-wrapper card-focus">
            <FlashCard flashCard={cards[currentIndex]} />
          </div>
          {currentIndex != cards.length - 1 ? (
            <div className="card-wrapper card-next">
              <FlashCard flashCard={cards[currentIndex + 1]} />
            </div>
          ) : null}
          {currentIndex + 2 <= cards.length - 1 ? (
            <div className="card-wrapper card-next-next">
              <FlashCard flashCard={cards[currentIndex + 2]} />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ListCards;
