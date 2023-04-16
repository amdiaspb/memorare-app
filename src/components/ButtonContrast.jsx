import styled from "styled-components";
import { useState } from "react";
import { ButtonStyle } from "./Button";

export function ButtonContrast(props) {
  const [pressed, setPressed] = useState(false);

  function handleClick(e) {
    e.target.blur();
    if (props.onClick) props.onClick(e);
  }

  return(
    <ButtonContrastStyle {...props} onClick={handleClick} className={pressed ? "pressed" : "normal"}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setTimeout(() => setPressed(false), 25)} 
      onMouseLeave={(e) => {
        setPressed(false);
        e.target.blur();
      }}
    >
      {props.children}
    </ButtonContrastStyle>
  );
}

const ButtonContrastStyle = styled(ButtonStyle)`
  color: ${props => props.theme.background};
  background-color: ${props => props.theme.font};

  &.normal:is(:hover, :focus) {
    color: ${props => props.theme.font};
    box-shadow: 0px 0px 0px 2px ${props => props.theme.font};
  }
`;
