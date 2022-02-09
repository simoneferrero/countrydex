import styled from "styled-components";

export const StyledDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors["very-dark"]};
  color: ${({ theme }) => theme.colors["very-light"]};
  display: flex;
  justify-content: space-between;
  left: ${({ $isOpen }: { $isOpen: boolean }) => ($isOpen ? "0" : "-9.5rem")};
  padding: 1rem;
  position: absolute;
  top: 6rem;
  transition: left 0.5s ease-in-out;
  width: 13rem;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;

    li {
      display: flex;
      align-items: center;
    }
  }
`;

export const StyledButton = styled.a`
  align-self: center;
  cursor: pointer;
  font-style: normal;
  height: fit-content;
  justify-self: flex-end;
  transform: rotate(-90deg);

  h3 {
    margin: 0;
    margin-top: 1rem;
  }
`;
