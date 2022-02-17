import type { Theme } from "types/Theme";

import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    bottom: ${theme.spacing.xl};
    left: ${theme.spacing.md};
    position: absolute;

    > div {
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius};
      color: ${theme.colors.primary};
      opacity: ${$isOpen ? 1 : 0};
      padding: ${theme.spacing.md};
      position: relative;
      transition: ${theme.transition};
      visibility: ${$isOpen ? "visible" : "hidden"};
      width: fit-content;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: left;

        li {
          align-items: center;
          display: flex;
          justify-content: space-between;

          & > span:nth-child(2) {
            margin-left: ${theme.spacing.xs};
          }
        }
      }
    }

    @media (min-width: ${theme.breakpoints.md}) {
      left: ${theme.spacing.xl};
    }
  `}
`;
