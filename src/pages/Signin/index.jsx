import { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Form } from "../../components/Form";
import { getTheme } from "../../components/GlobalStyle";
import { InputText } from "../../components/InputText";
import { Tooltip } from "../../components/Tooltip";
import { GlobalThemeContext } from "../../contexts/GlobalThemeContext";
import { useValue } from "../../hooks/useValue";
import { useSignin } from "../../services/authApi";

export default function SigninPage() {
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
  }, [signin.loading])

  return (
    <ThemeProvider theme={signin.error ? getTheme("inputError")[mode] : {}}>
    <AuthStyle>
        <h1>Memorare</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
          <button onClick={e => e.target.blur()}>Enter</button>
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

  h1 {
    font-family: "Amiri", serif;
    font-size: 64px;
    letter-spacing: -3px;
    text-align: center;
    margin-bottom: 48px;
    color: ${props => props.theme.fontLight};
    user-select: none;
  }

  .form {
    display: flex;
    flex-direction: column;

    h2 {
      text-align: center;
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

      button {
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
      }
    }
  }
`;
