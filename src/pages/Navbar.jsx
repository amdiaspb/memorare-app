import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUserData } from "../utils/helper";
import { TbCards, TbBook, TbTools, TbDoorExit } from "react-icons/tb";
import { IoSparklesSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { ButtonContrast } from "../components/ButtonContrast";
import { Button } from "../components/Button";

export function Navbar({ onExit }) {
  const navigate = useNavigate();
  const [logoutDisplay, setLogoutDisplay] = useState(false);

  function goTo(path, runOnExit = true) {
    //if (runOnExit && onExit) onExit();
    navigate(path);
  }

  function handleLogout() {
    setUserData(null);
    goTo("/signin");
  }

  return (
    <NavbarStyle>
      <Modal message="Are you sure?" display={logoutDisplay} setDisplay={setLogoutDisplay}>
        <ButtonContrast onClick={handleLogout}>Yes</ButtonContrast>
        <Button onClick={() => setLogoutDisplay(false)}>Cancel</Button>
      </Modal>

      <h1 onClick={() => goTo("/decks")}><IoSparklesSharp/> <span>Memorare</span></h1>
      <IconContext.Provider value={{ size: "1.6em" }}>
      <ul>
        <li onClick={() => goTo("/decks")}><TbCards/> Decks</li>
        <li onClick={() => goTo("/studies")}><TbBook/> Studies</li>
        <li onClick={() => goTo("/workshop")}><TbTools/> Workshop</li>
        <li className="logout" onClick={() => setLogoutDisplay(true)}>
          <TbDoorExit/> Logout
        </li>
      </ul>
      </IconContext.Provider>
    </NavbarStyle>
  );
}

const NavbarStyle = styled.nav`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};

  h1 {
    font-size: 40px;
    display:flex;
    justify-content: center;
    gap: 8px;
    padding: 32px 0;
    user-select: none;
    cursor: pointer;
    margin-right: -4px;

    span {
      font-family: "Amiri", serif;
      letter-spacing: -3px;
      margin-top: 4px;
    }
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

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
      gap: 8px;
      font-weight: 500;

      :hover {
        background-color: ${props => props.theme.border};
      }
    }

    .logout {
      margin-top: 32px;
    }
  }
`;
