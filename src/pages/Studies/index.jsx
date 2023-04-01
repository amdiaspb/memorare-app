import { useEffect } from "react";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { DeckItem } from "../../components/DeckItem";
import { useCreateStudySession, useGetStudies } from "../../services/generalApi";
import { mergeUserState } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export default function DecksPage() {
  const studies = useGetStudies();
  const createStudySession = useCreateStudySession();
  const navigate = useNavigate();

  useEffect(() => {
    studies.act();
  }, []);

  useEffect(() => {
    if (createStudySession.data) {
      const sessionStudyId = createStudySession.data.study_id;
      mergeUserState({ sessionStudyId });
      navigate("/studies/session");
    }
  }, [createStudySession.data]);

  function handleCreateStudySession(study) {
    createStudySession.act(study.id); // getsert
  }

  return (
    <BasePage>
      <StudiesPageStyle>
        <ol>
          {studies.data && studies.data.map(s => 
            <DeckItem key={s.id} deck={s} onClick={() => handleCreateStudySession(s)}/>
          )}
        </ol>
      </StudiesPageStyle>
    </BasePage>
  );
}

const StudiesPageStyle = styled.main`
  ol {
    margin-top: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
