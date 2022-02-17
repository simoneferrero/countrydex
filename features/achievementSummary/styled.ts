import type { Theme } from "types/Theme";

import styled, { css } from "styled-components";

export const StyledDrawer = styled.div`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    left: ${theme.sizing.md};
    position: absolute;
    top: 5.5rem;

    > div {
      background-color: ${theme.colors["very-dark"]};
      border-radius: ${theme.borderRadius};
      color: ${theme.colors["very-light"]};
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
      top: 6rem;
    }
  `}
`;
