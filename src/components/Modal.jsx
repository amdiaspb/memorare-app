import { useState } from "react";
import styled from "styled-components";

export function Modal({ children, message, display, setDisplay }) {
  return (
    <ModalStyle $display={display} onClick={(e) => (e.target === e.currentTarget) && setDisplay(false)}>
      <div className="box">
        <div className="message">
          {message}
        </div>
        <div className="options">
          {children}
        </div>
      </div>
    </ModalStyle>
  );
}

const ModalStyle = styled.div`
  display: ${props => props.$display ? "flex" : "none"};
  z-index: 10;
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    flex-direction: column;
    padding: 32px;
    border-radius: 8px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
    box-shadow: 0px 0px 40px 5px rgba(0, 0, 0, 0.25);

    .message {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 32px;
    }

    .options {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  }
`;
