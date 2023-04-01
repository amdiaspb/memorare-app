import { useEffect } from "react";
import { useGetDecks } from "../../services/decksApi";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useCreateStudy } from "../../services/generalApi";

export default function StudiesPage() {
  const decks = useGetDecks();
  const createStudy = useCreateStudy();

  useEffect(() => {
    decks.act();
  }, []);

  function handleCreateStudy(deck) {
    createStudy.act(deck.deck_snapshot_id);
  }

  return (
    <BasePage>
      <DecksPageStyle>
        <ol>
          {decks.data && decks.data.map(d => 
            <DeckItem key={d.id} deck={d} onClick={() => handleCreateStudy(d)}/>
          )}
        </ol>
      </DecksPageStyle>
    </BasePage>
  );
}

const DecksPageStyle = styled.main`
  ol {
    margin-top: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
