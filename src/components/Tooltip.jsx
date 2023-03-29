import styled from "styled-components";

export function Tooltip(props) {
  return (
    <TooltipStyle {...props}>
      ◆ &nbsp;{props.children}
    </TooltipStyle>
  );
}

const TooltipStyle = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${props => props.theme.secondary};
`;
