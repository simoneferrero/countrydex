import styled from "styled-components";

export const StyledDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors["very-dark"]};
  color: ${({ theme }) => theme.colors["very-light"]};
  padding: 1rem;
  position: absolute;
  right: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "0" : "-20rem")};
  top: 6rem;
  transition: right 0.5s ease-in-out;
  width: 20rem;

  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export const StyledButton = styled.button`
  background: none;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors["very-light"]};
  color: ${({ theme }) => theme.colors["very-light"]};
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  outline: inherit;
  padding: 4px 8px;
`;
