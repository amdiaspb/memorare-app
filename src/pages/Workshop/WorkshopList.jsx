import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useEffect } from "react";
import { useCreateDeck, useGetDecks } from "../../services/decksApi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { TbTools } from "react-icons/tb";
import { IconContext } from "react-icons";

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
      <IconContext.Provider value={{ size: "1.4em" }}>
      <h1><TbTools/> Workshop</h1>
      <ol>
        <Button onClick={handleCreateDeck}>Create Deck</Button>
        {decks.data?.length ?
          decks.data.map(d => <DeckItem key={d.id} deck={d} onClick={() => handleSelectDeck(d.id)}/>)
          : (!decks.loading && <div>You have no decks yet!</div>)
        }
      </ol>
      </IconContext.Provider>
    </WorkshopListStyle>
  );
}

const WorkshopListStyle = styled.main`
  h1 {
    display: flex;
    align-items: center;
    gap: 16px;
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
