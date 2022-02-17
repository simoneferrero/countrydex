import type { Theme } from "types/Theme";

import styled, { css } from "styled-components";

export const StyledDrawer = styled.div`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    bottom: ${theme.sizing.xl};
    left: ${theme.sizing.md};
    position: absolute;

    > div {
      background-color: ${theme.colors.veryDark};
      border-radius: ${theme.borderRadius};
      color: ${theme.colors.veryLight};
      opacity: ${$isOpen ? 1 : 0};
      padding: ${theme.sizing.md};
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
            margin-left: ${theme.sizing.xs};
          }
        }
      }
    }

    @media (min-width: ${theme.breakpoints.md}) {
      left: ${theme.sizing.xl};
    }
  `}
`;
