import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { InputText } from "../../components/InputText";
import { useValue } from "../../hooks/useValue";
import { BasePage } from "../BasePage";

export function WorkshopEdit() {
  const [title, updateTitle] = useValue();
  const navigate = useNavigate();
  const { deckId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleEditCards() {
    navigate(`/workshop/${deckId}/cards`);
  }
  
  function handleEditReadme() {
    navigate(`/workshop/${deckId}/readme`);
  }

  return (
    <BasePage>
      <WorkshopEditStyle>
        <h1>Workshop</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <h2>Information</h2>
          <div className="inputs">
            <InputText placeholder="Title" value={title} onChange={updateTitle}/>
            <InputText placeholder="Tags" value={title} onChange={updateTitle}/>
          </div>
          <div className="options-form">
            <Button>Save</Button>
          </div>
        </Form>
        <div className="options-create">
          <Button onClick={handleEditCards}>Edit Cards</Button>
          <Button onClick={handleEditReadme}>Edit Readme</Button>
          <Button>Return</Button>
        </div>
      </WorkshopEditStyle>
    </BasePage>
  );
}

const WorkshopEditStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 48px;
    text-align: center;
    margin-top: 96px;
    margin-bottom: 48px;
  }

  form {
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
    }

    .options-form {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
  }

  .options-create {
    display: flex;
    gap: 16px;
    margin-top: 32px;
  }
`;
