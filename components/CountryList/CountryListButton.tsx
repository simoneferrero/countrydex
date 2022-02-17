import type { Theme } from "types/Theme";

import { useUser } from "@auth0/nextjs-auth0";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  setIsCountryListOpen,
  isCountryListOpenSelector,
} from "features/countries/countriesSlice";

import { GrUnorderedList } from "react-icons/gr";
import { MdClose } from "react-icons/md";

import styled, { css } from "styled-components";

export const StyledOpenButton = styled.button`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    align-items: center;
    background: ${$isOpen ? "transparent" : theme.colors.veryDark};
    border-radius: 50%;
    border: none;
    color: ${$isOpen ? theme.colors.veryDark : theme.colors.veryLight};
    cursor: pointer;
    display: none;
    font: inherit;
    height: 3rem;
    justify-content: center;
    outline: inherit;
    padding: ${theme.sizing.xs};
    position: absolute;
    right: ${$isOpen ? theme.sizing.sm : theme.sizing.xl};
    top: ${$isOpen ? theme.sizing.sm : theme.sizing.xl};
    width: 3rem;

    &:hover {
      background: ${$isOpen ? "transparent" : theme.colors.medium};
    }

    svg {
      stroke: ${$isOpen ? theme.colors.veryDark : theme.colors.veryLight};
    }

    @media (min-width: ${theme.breakpoints.lg}) {
      display: flex;
    }
  `};
`;

const CountryListButton = () => {
  const { user } = useUser();
  const isCountryListOpen = useAppSelector(isCountryListOpenSelector);
  const dispatch = useAppDispatch();

  const labelText = `${isCountryListOpen ? "Close" : "Open"} Country List`;

  const handleClick = () => {
    dispatch(setIsCountryListOpen(!isCountryListOpen));
  };

  if (!user) {
    return null;
  }

  return (
    <StyledOpenButton
      $isOpen={isCountryListOpen}
      aria-label={labelText}
      onClick={handleClick}
    >
      {isCountryListOpen ? (
        <MdClose size={40} />
      ) : (
        <GrUnorderedList size={25} />
      )}
    </StyledOpenButton>
  );
};

export default CountryListButton;
