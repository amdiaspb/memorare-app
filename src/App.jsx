import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalThemeContext, GlobalThemeProvider } from "./contexts/GlobalThemeContext";
import { GlobalStyle } from "./components/GlobalStyle";
import { useContext } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";

import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";

import DecksPage from './pages/Decks';
import DecksReadme from './pages/DecksReadme';

import StudiesPage from './pages/Studies';
import StudiesInfo from './pages/StudiesInfo';
import { StudiesSession } from './pages/StudiesSession';

import WorkshopPage from './pages/Workshop';
import { WorkshopEdit } from './pages/Workshop/WorkshopEdit';
import { WorkshopCards } from './pages/WorkshopSession/WorkshopCards';
import { WorkshopReadme } from './pages/WorkshopSession/WorkshopReadme';

import dayjs from 'dayjs';

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
          <Route path="decks/:deckId" element={<DecksReadme />} />

          <Route path="studies" element={<StudiesPage />} />
          <Route path="studies/:studyId" element={<StudiesInfo />} />
          <Route path="studies/:studyId/session" element={<StudiesSession />} />

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
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
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
  font-family: "JetBrains Mono", monospace;
  background-color: ${props => props.theme.background};
  position: fixed;
  right: 32px;
  top: 32px;
  padding: 16px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
`;

export default App;
