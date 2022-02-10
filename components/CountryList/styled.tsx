import type { Theme } from "types/Theme";
import styled from "styled-components";

export const StyledDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors["very-dark"]};
  bottom: 2rem;
  color: ${({ theme }) => theme.colors["very-light"]};
  display: grid;
  grid-template-columns: max-content 2rem;
  height: 8rem;
  justify-content: space-between;
  left: ${({ $isOpen }: { $isOpen: boolean }) => ($isOpen ? "0" : "-14.5rem")};
  padding: 1rem;
  position: absolute;
  transition: left 0.5s ease-in-out;
  width: 18rem;

  @media (min-height: 420px) {
    height: 12rem;
  }

  @media (min-height: 550px) {
    height: 20rem;
  }

  & > div {
    display: grid;
    grid-template-rows: min-content auto;
    height: 100%;
    overflow: hidden;

    ul {
      list-style-type: none;
      margin: 0;
      overflow-y: auto;
      padding: 0;
      text-align: left;

      li {
        align-items: center;
        display: flex;
      }
    }
  }
`;

export const StyledFilterContainer = styled.div`
  margin-bottom: 0.5rem;

  input {
    width: 100%;
    text-align: center;
  }
`;

export const StyledCountryName = styled.li`
  background-color: ${({
    $isSelected,
    theme,
  }: {
    $isSelected: boolean;
    theme: Theme;
  }) => $isSelected && theme.colors.medium};
  cursor: pointer;
  padding: 0.2rem;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.medium};
  }
`;

export const StyledButton = styled.a`
  align-self: center;
  cursor: pointer;
  font-style: normal;
  height: fit-content;
  justify-self: center;
  transform: rotate(-90deg);

  h3 {
    margin: 0;
  }
`;
