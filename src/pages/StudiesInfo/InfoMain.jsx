import styled from "styled-components";
import { Button } from "../../components/Button";

export function InfoMain({ state, studyInfo, selectStudySession, setShowInfo }) {
  return (
    <InfoMainStyle className="container">
      {studyInfo && <h2>{studyInfo.name}</h2>}
      {state && <div className="state">
        <div className="new">
          <div className="title">New Cards</div>
          <div className="value">{state.today[0]}</div>
        </div>
        <div className="learn">
          <div className="title">Learning</div>
          <div className="value">{state.today[1]}</div>
        </div>
        <div className="review">
          <div className="title">Reviews</div>
          <div className="value">{state.today[2]}</div>
        </div>
      </div>}
      <div className="options">
        <Button onClick={selectStudySession}>Study Now</Button>
        <Button onClick={() => setShowInfo(false)}>Settings</Button>
      </div>
    </InfoMainStyle>
  );
}

const InfoMainStyle = styled.div`
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

  .state {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;

    > * {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 8px;

      .value {
        font-weight: bold;
      }
    }

    .new .value {
      color: blue;
    }

    .learn .value {
      color: red;
    }

    .review .value {
      color: green;
    }
  }

  .options {
    display: flex;
    gap: 16px;
  }
`;
