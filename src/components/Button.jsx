import { useState } from "react";
import styled from "styled-components";

export function Button(props) {
  const [pressed, setPressed] = useState(false);

  function handleClick(e) {
    e.target.blur();
    if (props.onClick) props.onClick(e);
  }

  return(
    <ButtonStyle {...props} onClick={handleClick} className={pressed ? "pressed" : "normal"}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setTimeout(() => setPressed(false), 25)} 
      onMouseLeave={(e) => {
        setPressed(false);
        e.target.blur();
      }}
    >
      {props.children}
    </ButtonStyle>
  );
}

export const ButtonStyle = styled.button`
  font: inherit;
  appearance: none;
  outline: none;
  border: none;
  padding: 12px 40px;
  border-radius: 4px;
  color: ${props => props.theme.fontLight};
  background-color: ${props => props.theme.button};
  white-space: nowrap;
  height: 40px;

  &.pressed {
    transform: scale(0.95);
  }

  &.normal:is(:hover, :focus) {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.fontContrast};
    box-shadow: 0px 0px 0px 2px ${props => props.theme.button};
  }
`;
