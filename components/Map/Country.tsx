import type { Geography, UserCountry } from "types/Countries";

import { memo } from "react";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledGeography } from "./styled";

interface Props {
  geo: Geography;
  isBootyMode: boolean;
  onClick: (countryId: string) => void;
  selectedCountry: string;
  setHoveredCountry: (countryId: string) => void;
  userCountry: UserCountry;
}

const GeoCountry = (props: Props) => {
  const {
    geo,
    isBootyMode,
    onClick,
    selectedCountry,
    setHoveredCountry,
    userCountry,
  } = props;
  const { properties } = geo;
  const countryId = properties.ISO_A3;
  const userCountryAchievements = Object.keys(userCountry ?? {}).filter(
    (achievementId) =>
      Object.keys(isBootyMode ? BOOTY_ACHIEVEMENTS : SFW_ACHIEVEMENTS).includes(
        achievementId
      ) && !!userCountry[achievementId]
  ).length;

  return (
    <StyledGeography
      $id={countryId}
      $isBootyMode={isBootyMode}
      $selectedCountry={selectedCountry}
      $userCountryAchievements={userCountryAchievements}
      geography={geo}
      onClick={() => onClick(countryId)}
      onMouseOut={() => setHoveredCountry("")}
      onMouseOver={() => setHoveredCountry(countryId)}
    />
  );
};

export default memo(GeoCountry);
