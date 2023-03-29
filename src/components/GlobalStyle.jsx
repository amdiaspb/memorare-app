import { createGlobalStyle } from 'styled-components';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/amiri/700.css';

export const GlobalStyle = createGlobalStyle`
  * {
    transition: all ease-out .1s;
    color: ${props => props.theme.font};
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: ${props => props.theme.backgroundColor};
  }

  button {
    cursor: pointer;
  }
`;

export function getTheme(theme = "light") {
  if (theme === "light") return {
    background: "white",
    backgroundColor: "#3175C2",
    border: "#dedede",
    font: "#212121",
    fontDark: "#212121",
    fontLight: "white",
    primary: "#3175C2",
    secondary: "#3175C2",
    button: "#3175C2",
    fontContrast: "#3175C2",
    placeholder: "#757575",
    placeholderSec: "#757575"
  }

  if (theme === "dark") return {
    background: "#202124",
    backgroundColor: "#2b64b0",
    border: "#3c4043",
    font: "white",
    fontDark: "#212121",
    fontLight: "white",
    primary: "#3e94e2",
    secondary: "#3e94e2",
    button: "#2b64b0",
    fontContrast: "white",
    placeholder: "#84898f",
    placeholderSec: "#84898f"
  }

  if (theme === "inputError") return {
    light: {
      border: "#d93025",
      secondary: "#d93025",
      placeholderSec: "#d93025"
    },
    dark: {
      border: "#f35a48",
      secondary: "#f35a48",
      placeholderSec: "#f35a48"
    }
  }
}
