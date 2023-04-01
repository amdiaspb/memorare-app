import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useEffect } from "react";
import { useCreateDeck, useGetDecks } from "../../services/decksApi";

export function WorkshopMain({ setDeck }) {
  const decks = useGetDecks();
  const createDeck = useCreateDeck();

  useEffect(() => {
    decks.act(false);
  }, []);
  
  useEffect(() => {
    if (createDeck.data) setDeck(createDeck.data);
  }, [createDeck.data]);

  function handleCreateDeck() {
    if (!createDeck.data) createDeck.act();
  }

  return (
    <WorkshopMainStyle>
      <h1>Workshop</h1>
      <div className="create" onClick={handleCreateDeck}>New</div>
      <ol>
        {decks.data &&
          decks.data.map(d => <DeckItem key={d.id} deck={d} onClick={() => setDeck(d)}/>)
        }
      </ol>
    </WorkshopMainStyle>
  );
}

const WorkshopMainStyle = styled.main`
  h1 {
    font-size: 48px;
    text-align: center;
    margin-top: 96px;
    margin-bottom: 48px;
  }

  .create {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${props => props.theme.border};
    border-radius: 50%;
    cursor: pointer;
    margin-top: -56px;
    margin-bottom: 16px;

    :hover {
      background-color: ${props => props.theme.border};
    }
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
