import type { Country } from "types/Countries";

import { memo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import {
  StyledButton,
  StyledDrawer,
  StyledFilterContainer,
  StyledCountryName,
} from "./styled";

interface Props {
  countryList: Country[];
  onClick: (country: string) => void;
  selectedCountry: string;
}

const CountryList = ({ countryList, onClick, selectedCountry }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const filteredCountryList = countryList.filter((country) =>
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
          {filteredCountryList.map(({ ISO_A3, NAME }) => (
            <StyledCountryName
              $isSelected={ISO_A3 === selectedCountry}
              key={ISO_A3}
              onClick={() => onClick(ISO_A3)}
            >
              {NAME}
            </StyledCountryName>
          ))}
        </ul>
      </div>
      <StyledButton>
        <h3 onClick={() => setIsOpen((prevValue) => !prevValue)}>Countries</h3>
      </StyledButton>
    </StyledDrawer>
  );
};

export default memo(CountryList);
