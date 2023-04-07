import styled from "styled-components";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
//.format("DD/MM/YYYY, hh:mm:ss, Z")
export function DeckItem({ deck, onClick }) {
  return (
    <DeckItemStyle onClick={onClick}>
      {/* <p className="id">[{deck.id}]:&nbsp;</p> */}
      <p className="name">{deck.name}&nbsp;</p>
      <p className="time">({deck.updated_at && dayjs(deck.updated_at).format("DD/MM/YYYY, HH:mm:ss")}) {deck.author && ("by " + deck.author)}</p> 
    </DeckItemStyle>
  );
}

const DeckItemStyle = styled.li`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  :hover {
    background-color: ${props => props.theme.border};
  }

  p {
    display: inline;
  }

  .id {
    font-weight: bold;
  }

  .name {
    font-weight: bold;
  }

  .time {
    font-family: 'JetBrains Mono', monospace;
    /* font-style: italic; */
    font-size: 14px;
    color: ${props => props.theme.placeholder};
  }
`;
