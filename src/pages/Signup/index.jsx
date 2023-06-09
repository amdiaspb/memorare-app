import { useRef, useEffect, useContext } from "react";
import { Form } from "../../components/Form";
import { getTheme } from "../../components/GlobalStyle";
import { InputText } from "../../components/Inputs";
import { GlobalThemeContext } from "../../contexts/GlobalThemeContext";
import { useValue } from "../../hooks/useValue";
import { useSignup } from "../../services/authApi";
import { AuthStyle } from "../Signin";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../../components/Tooltip";
import { useState } from "react";
import { useRedirect } from "../../hooks/useRedirect";
import { getUserData } from "../../utils/helper";
import { Button } from "../../components/Button";
import { IoSparklesSharp } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IconContext } from "react-icons";

export default function SignupPage() {
  useRedirect(getUserData(), "/decks");
  const signup = useSignup();
  const [name, updateName] = useValue();
  const [email, updateEmail] = useValue();
  const [password, updatePassword] = useValue();
  const [confirmPassword, updateConfirmPassword] = useValue();
  const [update, setUpdate] = useState(true);
  const { mode } = useContext(GlobalThemeContext);
  const isPasswordEqual = useRef(true);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const passwordCheck = (password === confirmPassword);
    if (passwordCheck) signup.act(name, email, password);
    isPasswordEqual.current = passwordCheck;
    setUpdate(!update);
  }

  useEffect(() => {
    if (!signup.loading) {
      if (signup.error) {
        const { item } = signup.error.data;
        if (item === "username") nameRef.current.focus();
        if (item === "email" || signup.error.status === 400) emailRef.current.focus();
      }
      if (!isPasswordEqual.current) {
        passwordRef.current.focus();
      }
      if (signup.data) navigate("/signin");
    }
  }, [signup.loading, update]);

  return (
    <AuthStyle>
      <h1><IoSparklesSharp/> Memorare</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <IconContext.Provider value={{ size: "1.4em" }}>
          <h2><MdOutlineManageAccounts/> Create your account</h2>
        </IconContext.Provider>
        <div className="inputs">
          {signup.error?.data.item === "username" ?
            <ThemeProvider theme={getTheme("inputError")[mode]}>
              <InputText 
                placeholder="Username" minLength="3" maxLength="16" required
                value={name} onChange={updateName} ref={nameRef}
              />
              <Tooltip className="tooltip">Username already in use.</Tooltip>
            </ThemeProvider>
            :
            <InputText 
              placeholder="Username" minLength="3" maxLength="16" required
              value={name} onChange={updateName}
            />
          }

          {signup.error?.data.item === "email" || signup.error?.status === 400 ?
            <ThemeProvider theme={getTheme("inputError")[mode]}>
              <InputText type="email"
                placeholder="E-mail" maxLength="30" required
                value={email} onChange={updateEmail} ref={emailRef}
              />
              <Tooltip className="tooltip">{signup.error.status === 400 ? "Invalid e-mail." : "E-mail already in use."}</Tooltip>
            </ThemeProvider>
            :
            <InputText type="email"
              placeholder="E-mail" maxLength="30" required
              value={email} onChange={updateEmail}
            />
          }

          {!isPasswordEqual.current ?
            <ThemeProvider theme={getTheme("inputError")[mode]}>
              <InputText type="password" 
                placeholder="Password" minLength="6" maxLength="30" required
                value={password} onChange={updatePassword} ref={passwordRef}
              />
              <InputText type="password" 
                placeholder="Confirm password" minLength="6" maxLength="30" required
                value={confirmPassword} onChange={updateConfirmPassword}
              />
              <Tooltip className="tooltip">Your passwords do not match.</Tooltip>
            </ThemeProvider>
            :
            <>
              <InputText type="password" 
                placeholder="Password" minLength="6" maxLength="30" required
                value={password} onChange={updatePassword}
              />
              <InputText type="password" 
                placeholder="Confirm password" minLength="6" maxLength="30" required
                value={confirmPassword} onChange={updateConfirmPassword}
              />
            </>
          }
        </div>
        <div className="options">
          <div className="alt" onClick={() => navigate("/signin")}>Sign in instead</div>
          <Button onClick={e => e.target.blur()}>Sign up</Button>
        </div>
      </Form>
    </AuthStyle> 
  );
}
