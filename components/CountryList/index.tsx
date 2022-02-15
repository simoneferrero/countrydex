import { memo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  countriesSelectors,
  isCountryListOpenSelector,
  selectedCountryIdSelector,
  setIsCountryListOpen,
  setSelectedCountryId,
} from "features/countries/countriesSlice";

import {
  StyledButton,
  StyledDrawer,
  StyledFilterContainer,
  StyledCountryName,
} from "./styled";

const CountryList = () => {
  const [filter, setFilter] = useState("");
  const { user } = useUser();
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
    <StyledDrawer $isOpen={isOpen}>
      <div>
        <StyledFilterContainer>
          <input
            aria-label="Country List Filter"
            autoComplete="none"
            onChange={({ target: { value } }) => setFilter(value)}
            placeholder="Filter by Country name"
            value={filter}
          />
        </StyledFilterContainer>
        <ul>
          {filteredCountries.map(({ ISO_A3, NAME }) => (
            <StyledCountryName
              $isSelected={ISO_A3 === selectedCountryId}
              key={ISO_A3}
              onClick={() => dispatch(setSelectedCountryId(ISO_A3))}
            >
              {NAME}
            </StyledCountryName>
          ))}
        </ul>
      </div>
      <StyledButton>
        <h3 onClick={() => dispatch(setIsCountryListOpen(!isOpen))}>
          Countries
        </h3>
      </StyledButton>
    </StyledDrawer>
  );
};

export default memo(CountryList);
