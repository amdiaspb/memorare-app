import { useMemo } from 'react';
import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '../components/GlobalStyle';

export const GlobalThemeContext = createContext();

export function GlobalThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);
  
  return (
    <GlobalThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </GlobalThemeContext.Provider>
  );
}

