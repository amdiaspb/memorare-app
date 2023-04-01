import styled from "styled-components";
import { Navbar } from "./Navbar";

export function BasePage(props) {
  const { children, onExit } = props;

  return (
    <BasePageStyle>
      <Navbar onExit={onExit}/>
      <div className="main-container">
        {children}
      </div>
    </BasePageStyle>
  );
}

const BasePageStyle = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;

    main {
      width: 1000px;
    }
  }
`;
