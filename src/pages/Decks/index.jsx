import { useEffect } from "react";
import { useGetDecks } from "../../services/decksApi";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useNavigate } from "react-router-dom";

export default function DecksPage() {
  const decks = useGetDecks();
  const navigate = useNavigate();

  useEffect(() => {
    decks.act();
  }, []);

  function handleClick(deckId) {
    navigate("/decks/" + deckId);
  }

  return (
    <BasePage>
      <DecksPageStyle>
        <h1>| &nbsp;Decks</h1>
        <ol>
          {decks.data && decks.data.map(d => 
            <DeckItem key={d.id} deck={d} onClick={() => handleClick(d.id)}/>
          )}
        </ol>
      </DecksPageStyle>
    </BasePage>
  );
}

const DecksPageStyle = styled.main`
  h1 {
    align-self: flex-start;
    font-size: 48px;
    margin-top: 96px;
    margin-bottom: 48px;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
