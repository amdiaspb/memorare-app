import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUserData } from "../utils/helper";

export function Navbar({ onExit }) {
  const navigate = useNavigate();

  function goTo(path, runOnExit = true) {
    //if (runOnExit && onExit) onExit();
    navigate(path);
  }

  return (
    <NavbarStyle>
      <ul>
        <li onClick={() => goTo("/decks")}>Decks</li>
        <li onClick={() => goTo("/studies")}>Studies</li>
        <li onClick={() => goTo("/workshop")}>Workshop</li>
        <li className="logout" onClick={() => {
          setUserData(null);
          goTo("/signin")
        }}>Logout</li>
      </ul>
    </NavbarStyle>
  );
}

const NavbarStyle = styled.nav`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 64px;
  height: 100vh;
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 96px;

    li {
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${props => props.theme.border};
      border-right: none;
      border-left: none;
      margin-top: -1px;
      cursor: pointer;

      :hover {
        background-color: ${props => props.theme.border};
      }
    }

    .logout {
      margin-top: 32px;
    }
  }
`;
