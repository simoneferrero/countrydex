import styled, { css } from "styled-components";

export const StyledHeader = styled.header`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
    display: flex;
    height: 4rem;
    justify-content: space-between;
    left: 0;
    padding: 0 ${theme.spacing.md};
    position: fixed;
    top: 0;
    transition: ${theme.transition};
    width: 100%;
    z-index: 1;

    h1 {
      margin: 0;
      margin-right: ${theme.spacing.md};
    }

    @media (min-width: ${theme.breakpoints.md}) {
      padding: 0 ${theme.spacing.xl};
    }
  `}
`;

export const StyledIconContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const StyledActionContainer = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: grid;
    grid-column-gap: ${theme.spacing.md};
    grid-template-columns: auto auto;

    @media (min-width: ${theme.breakpoints.sm}) {
      grid-column-gap: ${theme.spacing.xl};
    }
  `}
`;

export const StyledGreeting = styled.div`
  display: none;
  text-align: right;

  p {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

export const StyledMenuButton = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
