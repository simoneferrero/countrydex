import { memo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  countriesSelectors,
  isCountryListOpenSelector,
  selectedCountryIdSelector,
  setSelectedCountryId,
} from "features/countries/countriesSlice";
import { isBootyModeSelector } from "features/theme/themeSlice";

import { BOOTY_ACHIEVEMENTS, SFW_ACHIEVEMENTS } from "constants/achievements";

import { StyledContainer, StyledCountryName } from "./styled";

const CountryList = () => {
  const [filter, setFilter] = useState("");
  const { user } = useUser();
  const isBootyMode = useAppSelector(isBootyModeSelector);
  const isOpen = useAppSelector(isCountryListOpenSelector);
  const countries = useAppSelector(countriesSelectors.selectAll);
  const selectedCountryId = useAppSelector(selectedCountryIdSelector);
  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  const filteredCountries = countries.filter((country) =>
    !!filter ? country.NAME.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <StyledContainer $isOpen={isOpen}>
      <input
        aria-label="Country List Filter"
        autoComplete="none"
        onChange={({ target: { value } }) => setFilter(value)}
        placeholder="Filter by Country name"
        value={filter}
      />
      <ul>
        {filteredCountries.map(({ achievements, ISO_A3, NAME }) => {
          const userCountryAchievements = Object.keys(
            isBootyMode ? BOOTY_ACHIEVEMENTS : SFW_ACHIEVEMENTS
          ).filter((achievement) => achievements.includes(achievement)).length;

          return (
            <StyledCountryName
              $isBootyMode={isBootyMode}
              $isSelected={ISO_A3 === selectedCountryId}
              $userCountryAchievements={userCountryAchievements}
              key={ISO_A3}
              onClick={() => dispatch(setSelectedCountryId(ISO_A3))}
            >
              {NAME}
            </StyledCountryName>
          );
        })}
      </ul>
    </StyledContainer>
  );
};

export default memo(CountryList);
