import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import styled from "styled-components";
import { GlobalThemeContext, GlobalThemeProvider } from "./contexts/GlobalThemeContext";
import { useContext } from "react";
import { GlobalStyle } from "./components/GlobalStyle";

function App() {
  return (
    <GlobalThemeProvider>
    <UserProvider>
      <GlobalStyle/>
      <ThemeButton/> {/* Testing Only */}
      <Router>
      <Routes>
        <Route index path="*" element={<Navigate to="/signin" />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
      </Router>
    </UserProvider>
    </GlobalThemeProvider>
  );
}

// Testing Only
function ThemeButton() {
  const { mode, setMode } = useContext(GlobalThemeContext);
  function switchTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <ThemeButtonStyle onClick={switchTheme}>
      {mode}
    </ThemeButtonStyle>
  );
}

const ThemeButtonStyle = styled.button`
  background-color: ${props => props.theme.background};
  position: fixed;
  right: 32px;
  top: 32px;
  padding: 16px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
`;

export default App;
