import { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { getTheme } from "../../components/GlobalStyle";
import { InputText } from "../../components/Inputs";
import { Tooltip } from "../../components/Tooltip";
import { GlobalThemeContext } from "../../contexts/GlobalThemeContext";
import { useRedirect } from "../../hooks/useRedirect";
import { useValue } from "../../hooks/useValue";
import { useSignin } from "../../services/authApi";
import { getUserData, setUserData } from "../../utils/helper";
import { TbDoorEnter } from "react-icons/tb";
import { IoSparklesSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function SigninPage() {
  useRedirect(getUserData(), "/decks");
  const signin = useSignin();
  const [login, updateLogin] = useValue();
  const [password, updatePassword] = useValue();
  const { mode } = useContext(GlobalThemeContext);
  const loginRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signin.act(login, password);
  }

  useEffect(() => {
    if (!signin.loading && signin.error) loginRef.current.focus();
    if (signin.data) {
      setUserData(signin.data);
      navigate("/decks");
    }
  }, [signin.loading])

  return (
    <ThemeProvider theme={signin.error ? getTheme("inputError")[mode] : {}}>
    <AuthStyle>
      <h1><IoSparklesSharp/> Memorare</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <IconContext.Provider value={{ size: "1.2em" }}>
          <h2><TbDoorEnter/> Sign In</h2>
        </IconContext.Provider>
        <div className="inputs">
          <InputText 
            placeholder="E-mail or username" minLength="3" maxLength="16" required
            value={login} onChange={updateLogin} ref={loginRef}
          />
          <InputText type="password" 
            placeholder="Password" minLength="6" maxLength="30" required
            value={password} onChange={updatePassword}
          />
          {signin.error && <Tooltip className="tooltip">Invalid user or password</Tooltip>}
        </div>
        <div className="options">
          <div className="alt" onClick={() => navigate("/signup")}>Create account</div>
          <Button onClick={e => e.target.blur()}>Enter</Button>
        </div>
      </Form>
    </AuthStyle>
    </ThemeProvider>
  );
}

export const AuthStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.backgroundColor};

  h1 {
    position: relative;
    font-family: "Amiri", serif;
    letter-spacing: -3px;
    color: ${props => props.theme.fontLight};
    font-size: 64px;
    text-align: center;
    margin-bottom: 48px;
    user-select: none;
    margin-right: -16px;

    svg {
      position: absolute;
      left: -40px;
      top: -11px;
    }

    svg * {
      color: white;
    }
  }

  .form {
    display: flex;
    flex-direction: column;

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      margin-right: 24px;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 32px;
    }

    .tooltip {
      margin-top: -6px;
      margin-bottom: 2px;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }

    .options {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      font-weight: 500;

      .alt {
        color: ${props => props.theme.primary};
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;
