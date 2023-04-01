import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useValue } from "../../hooks/useValue";
import { useGetWorkshopSession, useUpsertWorkshopSession } from "../../services/workshopApi";
import { getUserData } from "../../utils/helper";
import { BasePage } from "../BasePage";

/// TODO: THE CARD CREATION
export function WorkshopSession() {
  const [cards, setCards] = useState();
  const [readme, setReadme] = useState();
  const [text, updateText, setText] = useValue();
  const session = useGetWorkshopSession();
  const upsertSession = useUpsertWorkshopSession();
  const deckId = useRef(getUserData().workshopDeckId);

  // SECTION 1 ===================================================

  useEffect(() => {
    session.act(deckId.current);
  }, [upsertSession.data]);

  useEffect(() => {
    if (session.data) {
      setReadme(session.data.readme);
      if (!text) setText(session.data.readme);
    }
  }, [session.data]);

  function saveSession() {
    const state = {
      cards: { currentIndex: -1, stack: {} },
      ...session.data,
      currentType: "cards",
      readme: text,
    };
    upsertSession.act(deckId.current, state);
  }

  // SECTION 2 ===================================================

  return(
    <BasePage>
      <WorkshopSessionStyle>
        <div className="edit-container">
          <Button className="preview">Preview</Button>
          <div className="editor">
            <div className="top"></div>
            <textarea className="text" value={text} onChange={updateText} spellCheck={false} autoFocus/>
          </div>
          <div className="options">
            <Button onClick={saveSession}>Save</Button>
            <Button>Exit</Button>
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

    .preview {
      align-self: flex-end;
      margin-bottom: 16px;
    }

    .options {
      display: flex;
      align-self: flex-end;
      gap: 8px;
    }
  }

  .editor {
    width: 880px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    box-shadow: 0px 0px 16px 0px #E8E8E8;
    box-shadow: 1px 1px 1px #999;
    margin-bottom: 16px;

    > {
      width: 100%;
    }

    .top {
      height: 48px;
      border-bottom: 1px solid ${props => props.theme.border};
    }

    .text {
      font-family: "JetBrains Mono", monospace;
      width: 100%;
      height: calc(400px - 48px);
      resize: none;
      border: none;
      padding: 16px;
      font-size: 14px;
      border-radius: 8px;
    }
  }
`;
