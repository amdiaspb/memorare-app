import { useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "@mui/material";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  function switchTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <ThemeProvider theme={theme}>
    <UserProvider>
      <CssBaseline />
      <Button variant="contained" onClick={switchTheme}>{mode}</Button>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
