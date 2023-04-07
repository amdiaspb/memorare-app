import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useEffect } from "react";
import { useCreateDeck, useGetDecks } from "../../services/decksApi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function WorkshopList() {
  const decks = useGetDecks();
  const createDeck = useCreateDeck();
  const navigate = useNavigate();

  useEffect(() => {
    decks.act(false);
  }, []);
  
  useEffect(() => {
    if (createDeck.data) navigate("/workshop/" + createDeck.data.id);
  }, [createDeck.data]);

  function handleCreateDeck() {
    if (!createDeck.data) createDeck.act();
  }

  function handleSelectDeck(deckId) {
    navigate("/workshop/" + deckId);
  }

  return (
    <WorkshopListStyle>
      <h1>| &nbsp;Workshop</h1>
      <ol>
        <Button onClick={handleCreateDeck}>Create Deck</Button>
        {decks.data &&
          decks.data.map(d => <DeckItem key={d.id} deck={d} onClick={() => handleSelectDeck(d.id)}/>)
        }
      </ol>
    </WorkshopListStyle>
  );
}

const WorkshopListStyle = styled.main`
  h1 {
    align-self: flex-start;
    font-size: 48px;
    margin-top: 96px;
    margin-bottom: 48px;
  }

  ol {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  button {
    position: absolute;
    top: -64px;
    right: 8px;
  }
`;
