import styled from "styled-components";

export function DeckItem({ deck, onClick }) {
  return (
    <DeckItemStyle onClick={onClick}>
      #{deck.id}: {deck.name}
    </DeckItemStyle>
  );
}

const DeckItemStyle = styled.li`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.border};
  }
`;
