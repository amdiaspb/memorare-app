import { useEffect } from "react";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { useGetStudyInfo } from "../../services/studiesApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { InfoMain } from "./InfoMain";
import { InfoSettings } from "./InfoSettings";

export default function StudiesInfo() {
  const studyInfo = useGetStudyInfo();
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [state, setState] = useState();
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    studyInfo.act(studyId);
  }, []);

  useEffect(() => {
    if (studyInfo.data) {
      setState(JSON.parse(studyInfo.data.state));
      console.log("INFO: ", studyInfo.data);
    }
  }, [studyInfo.data]);

  async function selectStudySession() {
    const { id } = studyInfo.data;
    navigate("/studies/" + id + "/session");
  }

  return (
    <BasePage>
      <StudiesInfoStyle>
        <h1>| &nbsp;Studies</h1>
        { showInfo 
          ? <InfoMain state={state} studyInfo={studyInfo.data}
              selectStudySession={selectStudySession} setShowInfo={setShowInfo}/>
          : <InfoSettings studyId={studyId} studyInfo={studyInfo.data} 
              setShowInfo={setShowInfo} updateInfo={() => studyInfo.act(studyId)}/>
        }
      </StudiesInfoStyle>
    </BasePage>
  );
}

const StudiesInfoStyle = styled.main`
  h1 {
    align-self: flex-start;
    font-size: 48px;
    margin-top: 96px;
    margin-bottom: 48px;
  }

  .container {
    width: 100%;
    padding: 32px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
  }
`;
