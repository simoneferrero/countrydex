import type { Theme } from "types/Theme";

import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    background-color: ${theme.colors.background};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.primary};
    display: ${!$isOpen && "none"};
    padding: ${theme.spacing.md};
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -20%);
    transition: ${theme.transition};
    width: 75%;

    > div {
      position: relative;
    }

    h3 {
      margin: 0;
      margin-bottom: 1rem;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      min-width: fit-content;
      width: 30rem;

      & span {
        white-space: nowrap;
      }
    }
  `}
`;
