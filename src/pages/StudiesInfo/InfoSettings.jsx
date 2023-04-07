import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "../../components/Button";
import { InputNumber } from "../../components/Inputs";
import { Modal } from "../../components/Modal";
import { useValue } from "../../hooks/useValue";
import { useDeleteStudy, usePatchStudy } from "../../services/generalApi";

export function InfoSettings({ studyId, studyInfo, setShowInfo, updateInfo }) {
  const [hardInterval, updateHardInterval] = useValue(studyInfo.hard_interval);
  const [goodInterval, updateGoodInterval] = useValue(studyInfo.good_interval);
  const [easyInterval, updateEasyInterval] = useValue(studyInfo.easy_interval);
  const [cardsLimit, updateCardsLimit] = useValue(studyInfo.cards_limit);
  const [reviewsLimit, updateReviewsLimit] = useValue(studyInfo.reviews_limit);
  const [cardsRandom, setCardsRandom] = useState(studyInfo.cards_random);

  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [restartDisplay, setRestartDisplay] = useState(false);
  const patchStudy = usePatchStudy();
  const deleteStudy = useDeleteStudy();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      hardInterval, goodInterval, easyInterval,
      cardsLimit, reviewsLimit, cardsRandom
    }
    await patchStudy.act(studyId, data);
    updateInfo();
  }

  async function handleDelete() {
    await deleteStudy.act(studyId);
    setDeleteDisplay(false);
    navigate("/studies");
  }

  return (
    <InfoSettingsStyle checked={cardsRandom}>

      <Modal message="Are you sure? (Delete session)" display={deleteDisplay} setDisplay={setDeleteDisplay}>
      <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
        <Button onClick={handleDelete}>Yes</Button></ThemeProvider>
        <Button onClick={() => setDeleteDisplay(false)}>Cancel</Button>
      </Modal>

      <Modal message="Are you sure? (Restart all progress)" display={restartDisplay} setDisplay={setRestartDisplay}>
      <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
        <Button>Yes</Button></ThemeProvider>
        <Button onClick={() => setRestartDisplay(false)}>Cancel</Button>
      </Modal>

      <ThemeProvider theme={{button: "#262626", fontContrast: "#262626"}}>
        <div className="danger">
          <Button onClick={() => setRestartDisplay(true)}>Restart</Button>
          <Button onClick={() => setDeleteDisplay(true)}>Delete</Button>
        </div>
      </ThemeProvider>

      <form className="container" onSubmit={handleSubmit}>
        <h2>Settings</h2>

        <div className="settings">
          <div className="left">
            <h3>Intervals <p>(in minutes)</p></h3>
            <InputNumber placeholder={"Hard Interval"} value={hardInterval} onChange={updateHardInterval} max={99999}/>
            <InputNumber placeholder={"Good Interval"} value={goodInterval} onChange={updateGoodInterval} max={99999}/>
            <InputNumber placeholder={"Easy Interval"} value={easyInterval} onChange={updateEasyInterval} max={99999}/>
          </div>
          <hr />
          <div className="right">
            <h3>General</h3>
            <InputNumber placeholder={"New cards (per day) limit"} value={cardsLimit} onChange={updateCardsLimit} max={999}/>
            <InputNumber placeholder={"New reviews (per day) limit"} value={reviewsLimit} onChange={updateReviewsLimit} max={999}/>
            <div className="randomize-cards" onClick={() => setCardsRandom(!cardsRandom)}>
              <div className="check"><p>✔</p></div>
              <p>Randomize new cards</p>
            </div>
          </div>
        </div>

        <div className="options">
          <Button type="submit">Save</Button>
          <Button type="button" onClick={() => setShowInfo(true)}>Return</Button>
        </div>
      </form>
    </InfoSettingsStyle>
  );
}

const InfoSettingsStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -64px;

  .danger {
    display: flex;
    gap: 16px;
    align-self: flex-end;
    margin-bottom: 24px;
    margin-right: 8px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      width: 100%;
      padding-bottom: 24px;
      border-bottom: 1px solid ${props => props.theme.border};
      margin-bottom: 24px;
    }

    h3 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 8px;

      p {
        font-size: 16px;
        font-weight: 400;
        color: ${props => props.theme.placeholder};
      }
    }

    .settings {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 64px;
      padding: 0 40px;
      margin-bottom: 32px;

      hr {
        width: 1px;
        height: 240px;
        border: none;
        border-right: 1px solid ${props => props.theme.border};
      }

      > * {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 16px;
      }

      .randomize-cards {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 14px;
        height: 44px;
        cursor: pointer;
        
        .check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          padding: 2px;
          margin-right: 16px;

          background-color: ${props => props.checked ? props.theme.primary : props.theme.background};
          border: 2px solid ${props => props.checked ? "none" : props.theme.border};
          outline: 2px solid ${props => props.checked ? props.theme.border : "none"};
          border-radius: 2px;

          p {
            color: ${props => props.checked ? props.theme.fontLight : props.theme.background};
          }
        }
      }
    }

    .options {
      display: flex;
      align-self: flex-end;
      gap: 16px;
    }
  }
`;


