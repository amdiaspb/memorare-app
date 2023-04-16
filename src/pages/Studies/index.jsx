import { useEffect } from "react";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useGetStudies } from "../../services/studiesApi";
import { useNavigate } from "react-router-dom";
import { TbBook } from "react-icons/tb";
import { IconContext } from "react-icons";

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
        <IconContext.Provider value={{ size: "1.4em" }}>
        <h1><TbBook/> Studies</h1>
        <ol>
          {studies.data?.length
            ? studies.data.map(s => <DeckItem key={s.id} deck={{...s, updated_at: s.deckDate}} onClick={() => selectStudySession(s)}/>)
            : (!studies.loading && <div>You have no studies yet, you can import them through the decks menu.</div>)
          }
        </ol>
        </IconContext.Provider>
      </StudiesPageStyle>
    </BasePage>
  );
}

const StudiesPageStyle = styled.main`
  h1 {
    display: flex;
    align-items: center;
    gap: 16px;
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
