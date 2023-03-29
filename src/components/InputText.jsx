import { forwardRef } from "react";
import styled from "styled-components";

export const InputText = forwardRef((props, ref) => {
  return (
    <InputTextStyle>
        <input type="text" {...props} ref={ref}/>
        <div className="style"/>
        <div className="placeholder">{props.placeholder}</div>
    </InputTextStyle>
  );
});

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
    color: ${props => props.theme.secondary};
    font-size: 12px;
  }

  input:not(:placeholder-shown) ~ .placeholder {
    color: ${props => props.theme.placeholderSec};
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
    border-color: ${props => props.theme.secondary};
  }
`;
