import type { Theme } from "types/Theme";
import styled, { css } from "styled-components";

export const StyledDrawer = styled.div`
  ${({ $isOpen, theme }: { $isOpen: boolean; theme: Theme }) => css`
    grid-template-rows: min-content auto;
    height: 100%;
    overflow: hidden;
    background-color: ${theme.colors.veryLight};
    bottom: ${theme.sizing.xl};
    color: ${theme.colors.veryDark};
    display: grid;
    height: 100%;
    justify-content: space-between;
    left: 0;
    margin-top: 4rem;
    padding: ${theme.sizing.md};
    position: absolute;
    top: 0;
    transition: left 0.5s ease-in-out;
    width: 100%;
    grid-template-columns: 100%;

    input {
      border-radius: ${theme.borderRadius};
      margin-bottom: 0.5rem;
      padding: ${theme.sizing.xs} ${theme.sizing.sm};
      text-align: center;
      width: 100%;
    }

    ul {
      list-style-type: none;
      margin: 0;
      overflow-y: auto;
      padding: 0;
      width: 100%;
    }

    @media (min-width: ${theme.breakpoints.sm}) {
      display: none;
    }

    @media (min-width: ${theme.breakpoints.lg}) {
      display: grid;
      width: 20rem;
      position: relative;
      margin-top: 0;
      border-left: 1px solid ${theme.colors.veryDark};
      display: ${$isOpen ? "grid" : "none"};
    }
  `}
`;

const getBackgroundColorValue = ({
  $isBootyMode,
  $isSelected,
  $userCountryAchievements,
  theme,
}: {
  $isBootyMode: boolean;
  $isSelected: boolean;
  $userCountryAchievements: number;
  theme: Theme;
}) => {
  if (!$isSelected) {
    return "transparent";
  }
  if (!$isBootyMode && $userCountryAchievements === 1) {
    return theme.colors.single;
  }
  if ($userCountryAchievements === ($isBootyMode ? 1 : 2)) {
    return theme.colors.double;
  }
  if ($userCountryAchievements === ($isBootyMode ? 2 : 3)) {
    return theme.colors.triple;
  }

  return theme.colors.medium;
};

export const StyledCountryName = styled.li`
  ${({
    $isBootyMode,
    $isSelected,
    $userCountryAchievements,
    theme,
  }: {
    $isBootyMode: boolean;
    $isSelected: boolean;
    $userCountryAchievements: number;
    theme: Theme;
  }) => css`
    align-items: center;
    background-color: ${getBackgroundColorValue({
      $isBootyMode,
      $isSelected,
      $userCountryAchievements,
      theme,
    })};
    border-radius: ${theme.borderRadius};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: ${theme.sizing.xs};
    width: 100%;

    &:hover {
      background-color: ${getBackgroundColorValue({
        $isBootyMode,
        $isSelected,
        $userCountryAchievements,
        theme,
      })};
    }
  `}
`;
