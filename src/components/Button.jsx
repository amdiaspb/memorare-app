import styled from "styled-components";

export function Button(props) {
  function handleClick(e) {
    e.target.blur()
    if (props.onClick) props.onClick(e);
  }

  return(
    <ButtonStyle {...props} onClick={handleClick}>
      {props.children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  font: inherit;
  appearance: none;
  outline: none;
  border: none;
  padding: 12px 40px;
  border-radius: 4px;
  color: ${props => props.theme.fontLight};
  background-color: ${props => props.theme.button};

  :focus, :hover {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.fontContrast};
    box-shadow: 0px 0px 0px 2px ${props => props.theme.button};
  }
`;
