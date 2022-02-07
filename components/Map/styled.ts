import type { Theme } from "types/Theme";

import { Geography } from "react-simple-maps";

import styled from "styled-components";

export const StyledMapContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 100rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  position: relative;

  > h2 {
    color: ${({ theme }) => theme.colors["very-dark"]};
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
`;

const getGeographyFillValue = ({
  $id,
  $isBootyMode,
  $selectedCountry,
  theme,
  $userCountryAchievements,
}: {
  $id: string;
  $isBootyMode: boolean;
  $selectedCountry: string | null;
  theme: Theme;
  $userCountryAchievements: number;
}) => {
  if ($selectedCountry === $id) {
    return theme.colors["very-dark"];
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

export const StyledGeography = styled(Geography)`
  cursor: pointer;
  fill: ${getGeographyFillValue};
  opacity: ${({ $selectedCountry, $id }) =>
    $selectedCountry && $selectedCountry !== $id && "0.7"};
  outline: none;
  stroke-width: 0.4;
  stroke: ${({ theme }) => theme.colors["very-light"]};
  transition: opacity 0.5s ease-in-out, fill 0.3s ease-in-out;

  &:hover {
    fill: ${({ theme }) => theme.colors["very-dark"]};
  }
`;
