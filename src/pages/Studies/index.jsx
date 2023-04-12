import { useEffect } from "react";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useGetStudies } from "../../services/studiesApi";
import { useNavigate } from "react-router-dom";

export default function DecksPage() {
  const studies = useGetStudies();
  const navigate = useNavigate();

  useEffect(() => {
    studies.act();
  }, []);

  async function selectStudySession(study) {
    navigate("/studies/" + study.id);
  }

  return (
    <BasePage>
      <StudiesPageStyle>
        <h1>| &nbsp;Studies</h1>
        <ol>
          {studies.data && studies.data.map(s => 
            <DeckItem key={s.id} deck={s} onClick={() => selectStudySession(s)}/>
          )}
        </ol>
      </StudiesPageStyle>
    </BasePage>
  );
}

const StudiesPageStyle = styled.main`
  h1 {
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
