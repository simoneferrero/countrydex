import { Theme } from "types/Theme";

import { MdClose } from "react-icons/md";

import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  ${({ $size, theme }: { $size: "small" | "large"; theme: Theme }) => css`
    background: none;
    border: none;
    color: ${theme.colors.veryDark};
    cursor: pointer;
    font: inherit;
    outline: inherit;
    padding: ${theme.sizing.xs};
    position: absolute;
    right: ${$size === "large" ? "-3.5rem" : "-2rem"};
    top: ${$size === "large" ? "-3.5rem" : "-2rem"};
  `}
`;

interface Props {
  onClick: () => void;
  labelText: string;
  size?: "small" | "large";
}

const CloseButton = ({ onClick, labelText, size = "large" }: Props) => (
  <StyledButton $size={size} aria-label={labelText} onClick={onClick}>
    <MdClose size={size === "large" ? 40 : 30} />
  </StyledButton>
);

export default CloseButton;
