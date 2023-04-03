import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import styled from "styled-components";
import { GlobalThemeContext, GlobalThemeProvider } from "./contexts/GlobalThemeContext";
import { useContext } from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import { useState } from 'react';
import WorkshopPage from './pages/Workshop';
import { BasePage } from './pages/BasePage';
import { WorkshopCards } from './pages/WorkshopSession/WorkshopCards';
import { useEffect } from 'react';
import DecksPage from './pages/Decks';
import StudiesPage from './pages/Studies';
import { StudiesSession } from './pages/StudiesSession';
import { WorkshopReadme } from './pages/WorkshopSession/WorkshopReadme';
import { WorkshopEdit } from './pages/Workshop/WorkshopEdit';

function App() {
  return (
    <GlobalThemeProvider>
      <GlobalStyle/>
      <ThemeButton/> {/* Testing Only */}
      <Router>
        <Routes>
          <Route index path="*" element={<Navigate to="/signin" />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route path="decks" element={<DecksPage />} />
          <Route path="decks/:deckId" element={<BasePage />} />

          <Route path="studies" element={<StudiesPage />} />
          <Route path="studies/session" element={<StudiesSession />} />

          <Route path="workshop" element={<WorkshopPage/>} />
          <Route path="workshop/:deckId" element={<WorkshopEdit/>} />
          <Route path="workshop/:deckId/cards" element={<WorkshopCards/>} />
          <Route path="workshop/:deckId/readme" element={<WorkshopReadme/>} />
        </Routes>
      </Router>
    </GlobalThemeProvider>
  );
}

// Testing Only
function ThemeButton() {
  const { mode, setMode } = useContext(GlobalThemeContext);
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    }, 1000)
  }, []);

  function switchTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <ThemeButtonStyle onClick={switchTheme}>
      {mode}, {time}
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
