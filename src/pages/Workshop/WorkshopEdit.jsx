import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { InputText } from "../../components/Inputs";
import { Modal } from "../../components/Modal";
import { useValue } from "../../hooks/useValue";
import { useDeleteDeck, useGetDeckById, useGetDeckSnapshot, usePatchDeck, useUpdateDeckSnapshot } from "../../services/decksApi";
import { useGetCardsInfoByDeckId } from "../../services/cardsApi";
import { BasePage } from "../BasePage";
import { ButtonContrast } from "../../components/ButtonContrast";
import { Tooltip } from "../../components/Tooltip";
import { useRef } from "react";
import { TbTools, TbSettings } from "react-icons/tb";
import { IconContext } from "react-icons";

export function WorkshopEdit() {
  const [title, updateTitle, setTitle] = useValue();
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const { deckId } = useParams();
  const updateDeckSnapshot = useUpdateDeckSnapshot();
  const deckSnapshot = useGetDeckSnapshot(); // TODO: Watch changes
  const cardsInfo = useGetCardsInfoByDeckId();
  const deck = useGetDeckById();
  const patchDeck = usePatchDeck();
  const deleteDeck = useDeleteDeck();
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [saved, setSaved] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    deck.act(deckId);
  }, []);

  useEffect(() => {
    if (deck.data) {
      setTitle(deck.data.name);
      setVisibility(deck.data.visibility);
      cardsInfo.act(deck.data.id);
      deckSnapshot.act(deck.data.deck_snapshot_id);
    }
  }, [deck.data]);

  useEffect(() => {
    if (!updateDeckSnapshot.loading && updateDeckSnapshot.data) {
      setSaved(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setSaved(false), 1500);
    }
  }, [updateDeckSnapshot.loading]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleEditCards() {
    navigate(`/workshop/${deckId}/cards`);
  }
  
  function handleEditReadme() {
    navigate(`/workshop/${deckId}/readme`);
  }

  async function handlePublishSync() {
    try {
      const data = { name: title, visibility, readme: deck.data.readme };
      await patchDeck.act(deckId, data);
      await updateDeckSnapshot.act(deckId);
    } catch (err) {
      
    }
  }

  async function handleDeleteDeck() {
    await deleteDeck.act(deckId);
    setDeleteDisplay(false);
    navigate("/workshop");
  }

  return (
    <BasePage>
      <Modal message="Are you sure?" display={deleteDisplay} setDisplay={setDeleteDisplay}>
        <ButtonContrast onClick={handleDeleteDeck}>Yes</ButtonContrast>
        <Button onClick={() => setDeleteDisplay(false)}>Cancel</Button>
      </Modal>

      <WorkshopEditStyle>
        <IconContext.Provider value={{ size: "1.4em" }}>
          <h1><TbTools/> Workshop</h1>
        </IconContext.Provider>
        <ButtonContrast onClick={() => setDeleteDisplay(true)}>Delete</ButtonContrast>
        <Form className="form" onSubmit={handleSubmit}>
          <IconContext.Provider value={{ size: "1.2em" }}>
            <h2><TbSettings/> Settings</h2>
          </IconContext.Provider>
          <div className="inputs">
            <InputText placeholder="Title" value={title} onChange={updateTitle}/>
            {/* <InputText placeholder="Tags"/> */}
            <div className="visibility">
              <div className="title">Visibility: </div>
              <Checkbox checked={!visibility} onClick={() => setVisibility(false)}>Private</Checkbox>
              <Checkbox checked={visibility} onClick={() => setVisibility(true)}>Public</Checkbox>
            </div>
          </div>
          <div className="options-create">
            <div className="left">
              <Button type="button" onClick={handleEditCards}>Edit Cards ({cardsInfo.data?.length})</Button>
              <Button type="button" onClick={handleEditReadme}>Edit Readme</Button>
            </div>
            <div className="right">
              <Tooltip className={`saved${saved ? " saved-show" : ""}`}>Updated</Tooltip>
              <Button type="submit" onClick={handlePublishSync}>Save Changes</Button>
            </div>
          </div>
        </Form>

      </WorkshopEditStyle>
    </BasePage>
  );
}

const WorkshopEditStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    display: flex;
    align-items: center;
    gap: 16px;
    align-self: flex-start;
    font-size: 48px;
    margin-top: 96px;
    margin-bottom: -16px
  }

  > button {
    align-self: flex-end;
    margin-bottom: 24px;
    margin-right: 8px;
  }

  form {
    position: relative;
    width: 100%;
    border: 1px solid ${props => props.theme.border};

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 32px;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;

      input {
        font-weight: 500;
      }
    }

    .visibility {
      display: flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      height: 44px;
      align-self: flex-end;

      border: 1px solid ${props => props.theme.placeholder};
      border-radius: 4px;
      padding: 0 14px;
      
      .title {
        margin-right: 4px;
        font-weight: 500;
      }
    }

    .options-create {
      display: flex;
      margin-top: 32px;
      justify-content: space-between;

      > * {
        display: flex;
        gap: 16px;
      }

      .right {
        gap: 8px;
      }

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
`;


function Checkbox(props) {
  return (
    <CheckboxStyle {...props}>
      <div className="box"/>
      <div className="text">
        {props.children}
      </div>
    </CheckboxStyle>
  )
}

const CheckboxStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .text {
    font-family: 'Inter', sans-serif;
  }

  .box {
    width: 14px;
    height: 14px;
    background-color: ${props => props.checked ? props.theme.font : props.theme.background};
    outline: 2px solid ${props => props.theme.border};
    border: 2px solid ${props => props.theme.background};
    padding: 2px;
    border-radius: 50%;
  }
  
`;
