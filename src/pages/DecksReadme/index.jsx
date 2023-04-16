import { BasePage } from "../BasePage";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetDeckById } from "../../services/decksApi";
import { useCreateStudy } from "../../services/studiesApi";
import { Button } from "../../components/Button";
import { Tooltip } from "../../components/Tooltip";
import { useState } from "react";
import { useRef } from "react";

export default function DecksReadme() {
  const deck = useGetDeckById();
  const createStudy = useCreateStudy();
  const { deckId } = useParams();
  const [saved, setSaved] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    deck.act(deckId);
  }, []);

  useEffect(() => {
    if (!createStudy.loading && createStudy.data) {
      setSaved(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setSaved(false), 1500);
    }
  }, [createStudy.loading]);

  function handleCreateStudy(deckSnapshotId) {
    createStudy.act(deckSnapshotId);
  }

  return (
    <BasePage>
      {deck.data && <DecksReadmeStyle>
        <div className="top">
          <h1><span>#</span>{deck.data.name}</h1>
          <div className="right">
            <Tooltip className={`saved${saved ? " saved-show" : ""}`}>Imported</Tooltip>
            <Button onClick={() => handleCreateStudy(deck.data.deck_snapshot_id)}>
              Import / Study
            </Button>
          </div>
        </div>
        <div className="head">
          {/* <h2>Default</h2> */}
        </div>
        <div className="readme">{deck.data.readme}</div>
      </DecksReadmeStyle>}
    </BasePage>
  );
}

const DecksReadmeStyle = styled.main`
  padding-top: 144px;

  .top {
    display: flex;
    justify-content: space-between;

    h1 {
      display: flex;
      gap: 16px;
      font-size: 32px;
      line-height: 1.1em;
      margin-left: -38px;

      span {
        color: ${props => props.theme.border};
      }
    }

    .right {
      align-self: flex-end;
      display: flex;
      gap: 8px;

      .saved {
        white-space: nowrap;
        margin-top: 14px;
        margin-right: -8px;
        font-size: 13px;
        color: ${props => props.theme.green};
        opacity: 0;
      }

      .saved-show {
        margin-right: 8px;
        opacity: 100%;
      }
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    margin-top: 8px;
    font-weight: 400;
    color: ${props => props.theme.placeholder};
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    width: fit-content;
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
  }

  .readme {
    white-space: pre-wrap;
    font-size: 1.075rem;
    line-height: 1.5em;

    border-top: 1px solid ${props => props.theme.border};
    margin-top: 24px;
    padding-top: 36px;

    &::first-letter {
      font-size: 1.2rem;
      font-weight: 600;      
    }
  }
`;
