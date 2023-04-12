import { BasePage } from "../BasePage";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetDeckById } from "../../services/decksApi";
import { useCreateStudy } from "../../services/studiesApi";
import { Button } from "../../components/Button";

export default function DecksReadme() {
  const deck = useGetDeckById();
  const createStudy = useCreateStudy();
  const { deckId } = useParams();

  useEffect(() => {
    deck.act(deckId);
  }, []);

  function handleCreateStudy(deckSnapshotId) {
    createStudy.act(deckSnapshotId);
  }

  return (
    <BasePage>
      {deck.data && <DecksReadmeStyle>
        <div className="top">
          <h1>{deck.data.name}</h1>
          <Button onClick={() => handleCreateStudy(deck.data.deck_snapshot_id)}>
            Import / Study
          </Button>
        </div>
        <div className="readme">{deck.data.readme}</div>
      </DecksReadmeStyle>}
    </BasePage>
  );
}

const DecksReadmeStyle = styled.main`
  padding-top: 144px;

  .top {
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 32px;
      line-height: 1.1em;
    }

    button {
      align-self: flex-end;
    }
  }

  .readme {
    white-space: pre-wrap;
    font-size: 1.075rem;
    line-height: 1.5em;
  }
`;
