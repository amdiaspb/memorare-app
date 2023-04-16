import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Tooltip } from "../../components/Tooltip";
import { useValue } from "../../hooks/useValue";
import { useGetDeckById, usePatchDeck } from "../../services/decksApi";
import { BasePage } from "../BasePage";

export function WorkshopReadme() {
  const [text, updateText, setText] = useValue();
  const { deckId } = useParams();
  const deck = useGetDeckById();
  const patchDeck = usePatchDeck();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const timeout = useRef(null);

  // SECTION 1 ===================================================

  useEffect(() => {
    deck.act(deckId);
  }, []);

  useEffect(() => {
    if (deck.data) {
      if (!text) setText(deck.data.readme);
    }
  }, [deck.data]);

  useEffect(() => {
    if (!patchDeck.loading && patchDeck.data) {
      setSaved(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setSaved(false), 1500);
    }
  }, [patchDeck.loading]);

  function handleSave() {
    const data = { readme: text, name: deck.data.name, visibility: deck.data.visibility };
    patchDeck.act(deckId, data);
  }

  // SECTION 2 ===================================================

  return(
    <BasePage>
      <WorkshopSessionStyle>
        <div className="edit-container">
          {/* <Button>Preview</Button> */}
          <div className="editor">
            {/* <div className="top"></div> */}
            <textarea className="text" value={text} onChange={updateText} spellCheck={false} autoFocus/>
          </div>
          <div className="options">
            <Tooltip className={`saved${saved ? " saved-show" : ""}`}>Saved</Tooltip>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => navigate("/workshop/" + deckId)}>Exit</Button>
          </div>
        </div>
      </WorkshopSessionStyle>
    </BasePage>
  );
}

const WorkshopSessionStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  .edit-container {
    position: fixed;
    bottom: 48px;
    display: flex;
    flex-direction: column;

    button {
      align-self: flex-end;
      margin-bottom: 16px;
    }

    .options {
      display: flex;
      align-self: flex-end;
      gap: 8px;

      .saved {
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

  .editor {
    width: 880px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    box-shadow: 1px 1px 1px ${props => props.theme.border};
    margin-bottom: 16px;

    > {
      width: 100%;
    }

    .top {
      height: 48px;
      border-bottom: 1px solid ${props => props.theme.border};
    }

    .text {
      opacity: ${props => props.fade ? 0 : 1};
      font-family: "JetBrains Mono", monospace;
      width: 100%;
      height: calc(400px - 40px);
      resize: none;
      border: none;
      padding: 16px;
      font-size: 15.1px;
      border-radius: 8px;
      background-color: ${props => props.theme.background};
      color: ${props => props.theme.font};
    }
  }
`;
