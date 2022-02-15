import type { Geography } from "types/Countries";

import { memo } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  countriesSelectors,
  setSelectedCountryId,
  selectedCountryIdSelector,
} from "features/countries/countriesSlice";
import { selectIsBootyMode } from "features/theme/themeSlice";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledGeography } from "./styled";

interface Props {
  geo: Geography;
  setHoveredCountry: (countryId: string) => void;
}

const Country = ({ geo, setHoveredCountry }: Props) => {
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const selectedCountryId = useAppSelector(selectedCountryIdSelector);
  const { properties } = geo;
  const countryId = properties.ISO_A3;
  const countryAchievements =
    useAppSelector((state) => countriesSelectors.selectById(state, countryId))
      ?.achievements ?? [];
  const userCountryAchievements = Object.keys(
    isBootyMode ? BOOTY_ACHIEVEMENTS : SFW_ACHIEVEMENTS
  ).filter((achievement) => countryAchievements.includes(achievement)).length;
  const dispatch = useAppDispatch();

  return (
    <StyledGeography
      $id={countryId}
      $isBootyMode={isBootyMode}
      $selectedCountryId={selectedCountryId}
      $userCountryAchievements={userCountryAchievements}
      geography={geo}
      onClick={() => dispatch(setSelectedCountryId(countryId))}
      onMouseOut={() => setHoveredCountry("")}
      onMouseOver={() => setHoveredCountry(countryId)}
    />
  );
};

export default memo(Country);
