import type { Theme } from "types/Theme";

import { Geography } from "react-simple-maps";

import styled, { css } from "styled-components";

export const StyledWrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

export const StyledMapContainer = styled.div`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  > h2 {
    color: ${({ theme }) => theme.colors.veryDark};
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }

  > svg {
    height: 100%;
    overflow: visible;
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 4rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 9rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 12rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 18rem;
  }
`;

const getGeographyFillValue = ({
  $id,
  $isBootyMode,
  $selectedCountryId,
  $userCountryAchievements,
  theme,
}: {
  $id: string;
  $isBootyMode: boolean;
  $selectedCountryId: string | null;
  $userCountryAchievements: number;
  theme: Theme;
}) => {
  if ($selectedCountryId === $id) {
    return theme.colors.veryDark;
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

const getOpacityValue = ({
  $id,
  $selectedCountryId,
}: {
  $id: string;
  $selectedCountryId: string | null;
}) => $selectedCountryId && $selectedCountryId !== $id && "0.7";

export const StyledGeography = styled(Geography)`
  ${({ theme }) => css`
    cursor: pointer;
    fill: ${getGeographyFillValue};
    opacity: ${getOpacityValue};
    outline: none;
    stroke-width: 0.4;
    stroke: ${theme.colors.veryLight};
    transition: ${theme.transition};

    &:hover {
      fill: ${({ theme }) => theme.colors.veryDark};
    }
  `}
`;
