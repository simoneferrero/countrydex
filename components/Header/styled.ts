import styled from "styled-components";

export const StyledHeader = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors["very-light"]};
  display: flex;
  height: 4rem;
  justify-content: space-between;
  left: 0;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  z-index: 1;

  h1 {
    margin: 0;
    margin-right: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

export const StyledIcon = styled.span`
  position: absolute;
  top: 2px;
  ${({ isLeft }: { isLeft?: boolean }) =>
    isLeft ? "left: 4px;" : "right: 4px;"}
`;

export const StyledActionContainer = styled.div`
  align-items: center;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: auto auto;

  @media (min-width: 768px) {
    grid-column-gap: 2rem;
  }
`;

export const StyledGreetingContainer = styled.div`
  align-items: center;
  display: none;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const StyledGreeting = styled.div`
  text-align: right;

  p {
    margin: 0;
  }
`;

export const StyledMenuButton = styled.a`
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;
