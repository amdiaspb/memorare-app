import styled, { ThemeProvider } from "styled-components";

export default function SigninPage() {
  return (
    <SigninStyle>
        <h1>Memorare</h1>
      <Form className="form">
        <h2>Sign In</h2>
        <div className="inputs">
          <InputText placeholder="E-mail or username"/>
          <InputText type="password" placeholder="Password"/>
        </div>
        <div className="options">
          <div className="signup">Create account</div>
          <button>Enter</button>
        </div>
      </Form>
    </SigninStyle>
  );
}

const SigninStyle = styled.div`
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

      .signup {
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

function Form(props) {
  return (
    <FormStyle {...props}>
      {props.children}
    </FormStyle>
  )
}

const FormStyle = styled.form`
  width: 450px;
  height: fit-content;
  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  padding: 48px;
`;

function InputText(props) {
  return (
    <InputTextStyle>
        <input type="text" {...props}/>
        <div className="style"/>
        <div className="placeholder">{props.placeholder}</div>
    </InputTextStyle>
  );
}

const InputTextStyle = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  
  > * {
    position: absolute;
    font-size: 16px;
  }

  input {
    z-index: 1;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    padding: 0 14px;

    ::placeholder {
      color: transparent;
    }
  }

  // PLACEHOLDER =====================================
  .placeholder {
    color: ${props => props.theme.placeholder};
    display: flex;
    align-items: center;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  input:focus-visible ~ .placeholder,
  input:not(:placeholder-shown) ~ .placeholder,
  input:focus-visible:not(:placeholder-shown) ~ .placeholder {
    top: 0;
    left: 8px;
    padding: 0 6px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    font-size: 12px;
  }

  input:not(:placeholder-shown) ~ .placeholder {
    color: ${props => props.theme.placeholder};
  }
  
  // STYLE ==========================================
  .style {
    transition: all ease .05s;
    width: 100%;
    height: 100%;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
  }
  
  input:focus-visible ~ .style {
    border-width: 2px;
    border-color: ${props => props.theme.primary};
  }
`;
