import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useValue } from "../../hooks/useValue";
import { useGetCardById, useGetCardsInfoByDeckId, usePatchCard } from "../../services/generalApi";
import { getUserData } from "../../utils/helper";
import { BasePage } from "../BasePage";

/// TODO: THE CARD CREATION
export function WorkshopCards() {
  const [text, updateText, setText] = useValue();
  const [tab, setTab] = useState("front")
  const [card, setCard] = useState();
  const { deckId } = useParams();
  const getCard = useGetCardById();
  const cardsInfo = useGetCardsInfoByDeckId();
  const patchCard = usePatchCard();

  // SECTION 1 ===================================================

  useEffect(() => {
    cardsInfo.act(deckId);
  }, []);

  useEffect(() => {
    if (cardsInfo.data) {
      const cardId = getUserData().editorCardId || cardsInfo.data[0].id;
      getCard.act(cardId);
    }
  }, [cardsInfo.data]);

  useEffect(() => {
    if (getCard.data) {
      setText(getCard.data.front);
      setCard(getCard.data);
    }
  }, [getCard.data]);

  function handleSave() {
    const front = (tab === "front") ? text : card.front;
    const back = (tab === "back") ? text : card.back;
    patchCard.act(card.id, { front, back });
  }

  // SECTION 2 ===================================================

  return(
    <BasePage>
      <WorkshopSessionStyle>
        <div className="edit-container">
          <Button className="preview">Preview</Button>
          <div className="editor">

            <div className="tabs">
              <div className={"first " + (tab === "front" && "selected")} onClick={() => {
                if (tab === "front") return;
                setTab("front");
                setText(card.front);
                setCard({...card, back: text});
              }}>
                • &nbsp;Front
              </div>
              <div className={"last " + (tab === "back" && "selected")} onClick={() => {
                if (tab === "back") return;
                setTab("back");
                setText(card.back);
                setCard({...card, front: text});
              }}>
                • &nbsp;Back
              </div>
            </div>

            <div className="top"></div>
            <textarea className="text" value={text} onChange={updateText} spellCheck={false} autoFocus/>
          </div>
          <div className="options">
            <Button onClick={handleSave}>Save</Button>
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
    position: relative;
    width: 880px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 0 8px 8px;
    box-shadow: 0px 0px 16px 0px #E8E8E8;
    box-shadow: 1px 1px 1px #999;
    margin-bottom: 16px;

    > {
      width: 100%;
    }

    .tabs {
      position: absolute;
      top: -40px;
      display: flex;

      > * {
        width: 120px;
        height: 40px;
        border: 1px solid ${props => props.theme.border};
        margin-left: -1px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        cursor: pointer;
        background-color: ${props => props.theme.border};
        border-bottom: 1px solid ${props => props.theme.border};
      }
      
      .selected {
        background-color: inherit;
        border-bottom: 1px solid white;
      }
      
      .first {
        border-radius: 8px 0 0 0;
      }

      .last {
        border-radius: 0 8px 0 0;
      }
    }

    .top {
      height: 40px;
      border-bottom: 1px solid ${props => props.theme.border};
    }

    .text {
      font-family: "JetBrains Mono", monospace;
      width: 100%;
      height: calc(400px - 40px);
      resize: none;
      border: none;
      padding: 16px;
      font-size: 14px;
      border-radius: 8px;
    }
  }
`;
