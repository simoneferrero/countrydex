import type { Theme } from "types/Theme";
import styled from "styled-components";

export const StyledDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors["very-dark"]};
  bottom: ${({ $isOpen }: { $isOpen: boolean }) =>
    $isOpen ? "0" : "-16.9rem"};
  color: ${({ theme }) => theme.colors["very-light"]};
  display: grid;
  /* grid-template-rows: auto auto; */
  height: 20rem;
  left: 50%;
  padding: 1rem;
  position: absolute;
  transform: translateX(-50%);
  transition: bottom 0.5s ease-in-out;
  width: 15rem;

  ul {
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
    overflow-y: auto;
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
  cursor: pointer;
  font-style: normal;
  height: fit-content;

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
    text-align: center;
  }
`;
