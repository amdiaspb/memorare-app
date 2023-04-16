import { useEffect } from "react";
import { useGetDecks } from "../../services/decksApi";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useNavigate } from "react-router-dom";
import { TbCards } from "react-icons/tb";
import { IconContext } from "react-icons";

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
        <IconContext.Provider value={{ size: "1.4em" }}>
        <h1><TbCards/> Decks</h1>
        <ol>
          {decks.data?.length
            ? decks.data.map(d => <DeckItem key={d.id} deck={d} onClick={() => handleClick(d.id)}/>)
            : (!decks.loading && <div>What a pickle! There are no public decks available, but you can create your own on the workshop menu.</div>)
          }
        </ol>
        </IconContext.Provider>
      </DecksPageStyle>
    </BasePage>
  );
}

const DecksPageStyle = styled.main`
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
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
