import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { useValue } from "../../hooks/useValue";
import { useCreateCard, useDeleteCard, useGetCardById, useGetCardsInfoByDeckId, usePatchCard } from "../../services/cardsApi";
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
  const createCard = useCreateCard();
  const deleteCard = useDeleteCard();
  const [fade, setFade] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const nextOption = useRef(null);
  const navigate = useNavigate();

  // SECTION 1 ===================================================

  useEffect(() => {
    cardsInfo.act(deckId);
  }, []);

  useEffect(() => {
    if (cardsInfo.data) {
      if (!card) {
        const cardId = getUserData().editorCardId || cardsInfo.data[0].id;
        getCard.act(cardId);
      } else {
        const query = document.querySelector("select");
        if (nextOption.current) query.options[nextOption.current].selected = true;
        else query.lastElementChild.selected = true;
      }
    }
  }, [cardsInfo.data]);

  useEffect(() => {
    if (getCard.data) {
      setText(tab === "front" ? getCard.data.front : getCard.data.back);
      setCard(getCard.data);
    }
  }, [getCard.data]);

  useEffect(() => {
    if (createCard.data) {
      setText(createCard.data.front);
      setCard(createCard.data);
    }
  }, [createCard.data]);

  function handleSave() {
    const front = (tab === "front") ? text : card.front;
    const back = (tab === "back") ? text : card.back;
    console.log(card.id, { front, back });
    patchCard.act(card.id, { front, back });
  }

  function handleAddCard() {
    setFade(true);
    setTimeout(async () => {
      await createCard.act(deckId);
      await cardsInfo.act(deckId);
      setFade(false);
    }, 200);
  }

  function onOptionChangeHandler(e) {
    setFade(true);
    setTimeout(async () => {
      await getCard.act(+e.target.value);
      setFade(false);
    }, 200);
  }

  async function handleDeleteCard() {
    const select = document.querySelector("select");
    if (select.options.length > 2) {
      await deleteCard.act(card.id);
      cardsInfo.act(deckId);

      const isLast = select.selectedIndex === (select.options.length - 1);
      const index = select.selectedIndex + (isLast ? -1 : 1);
      const option = select.options[index];

      nextOption.current = isLast ? index : select.selectedIndex;
      
      setFade(true);
      setTimeout(async () => {
        await getCard.act(+option.value);
        setFade(false);
      }, 200);
    }

    setDeleteDisplay(false);
  }

  // SECTION 2 ===================================================

  return(
    <BasePage>
      <Modal message="Are you sure?" display={deleteDisplay} setDisplay={setDeleteDisplay}>
      <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
        <Button onClick={handleDeleteCard}>Yes</Button></ThemeProvider>
        <Button onClick={() => setDeleteDisplay(false)}>Cancel</Button>
      </Modal>

      <WorkshopSessionStyle fade={fade}>
        <div className="edit-container">
          <div className="top-options">
            <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
              <Button onClick={() => setDeleteDisplay(true)}>Delete</Button></ThemeProvider>
            <Button>Preview</Button>
          </div>

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

            <div className="top">
              <select onChange={onOptionChangeHandler}>
                <option disabled>Please choose one option</option>
                {cardsInfo.data && cardsInfo.data.map((c, i) => <option key={c.id} value={c.id}>{i+1}</option>)}
              </select>
            </div>
            <textarea className={"text " + (fade && "fade")} value={text} onChange={updateText} spellCheck={false} placeholder="Empty" autoFocus/>
          </div>
          <div className="options">
            <div><Button onClick={handleAddCard}>Add Card</Button></div>
            <div className="save">
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={() => navigate("/workshop/" + deckId)}>Exit</Button>
            </div>
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

    .options {
      display: flex;
      justify-content: space-between;

      .save {
        display: flex;
        gap: 8px;
      }
    }
  }

  .top-options {
    align-self: flex-end;
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
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
      display: flex;
      align-items: center;
      padding-left: 16px;
      height: 40px;
      border-bottom: 1px solid ${props => props.theme.border};
    }

    .text {
      transition: all ease-in-out .2s;
      opacity: ${props => props.fade ? 0 : 1};
      font-family: "JetBrains Mono", monospace;
      width: 100%;
      height: calc(400px - 40px);
      resize: none;
      border: none;
      padding: 16px;
      font-size: 15.1px;
      border-radius: 8px;
    }
  }
`;
