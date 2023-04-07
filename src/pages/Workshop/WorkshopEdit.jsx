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
import { useGetCardsInfoByDeckId } from "../../services/generalApi";
import { BasePage } from "../BasePage";

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
      await patchDeck.act(deckId, { name: title, visibility });
      updateDeckSnapshot.act(deckId);
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
      <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
        <Button onClick={handleDeleteDeck}>Yes</Button></ThemeProvider>
        <Button onClick={() => setDeleteDisplay(false)}>Cancel</Button>
      </Modal>

      <WorkshopEditStyle>
        <h1>| &nbsp;Workshop</h1>
        <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
          <Button onClick={() => setDeleteDisplay(true)}>Delete</Button></ThemeProvider>
        <Form className="form" onSubmit={handleSubmit}>
          <h2>Settings</h2>
          <div className="inputs">
            <InputText placeholder="Title" value={title} onChange={updateTitle}/>
            <InputText placeholder="Tags"/>
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
      text-align: center;
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
