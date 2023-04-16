import { useEffect } from "react";
import { BasePage } from "../BasePage";
import styled from "styled-components";
import { useGetStudyInfo } from "../../services/studiesApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { InfoMain } from "./InfoMain";
import { InfoSettings } from "./InfoSettings";
import { TbBook } from "react-icons/tb";
import { IconContext } from "react-icons";

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
      // console.log("INFO: ", studyInfo.data);
    }
  }, [studyInfo.data]);

  async function selectStudySession() {
    const { id } = studyInfo.data;
    navigate("/studies/" + id + "/session");
  }

  return (
    <BasePage>
      <StudiesInfoStyle>
        <IconContext.Provider value={{ size: "1.4em" }}>
        <h1><TbBook/> Studies</h1>
        { showInfo 
          ? <InfoMain state={state} studyInfo={studyInfo.data}
              selectStudySession={selectStudySession} setShowInfo={setShowInfo}/>
          : <InfoSettings studyId={studyId} studyInfo={studyInfo.data} 
              setShowInfo={setShowInfo} updateInfo={() => studyInfo.act(studyId)}/>
        }
        </IconContext.Provider>
      </StudiesInfoStyle>
    </BasePage>
  );
}

const StudiesInfoStyle = styled.main`
  h1 {
    display: flex;
    align-items: center;
    gap: 16px;
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
