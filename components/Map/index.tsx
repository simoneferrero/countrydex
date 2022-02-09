import type { Countries, Geography, UserCountries } from "types/Countries";

import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import { useAppSelector } from "app/hooks";
import { selectIsBootyMode } from "features/theme/themeSlice";

import {
  ComposableMap,
  Geographies,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import Country from "./Country";

import { StyledMapContainer } from "./styled";

interface Props {
  countryList: Countries;
  geoUrl: string;
  onCountryClick: (country: string) => void;
  selectedCountry: string;
  userCountries: UserCountries;
}

const Map = ({
  countryList,
  geoUrl,
  onCountryClick,
  selectedCountry,
  userCountries,
}: Props) => {
  const [hoveredCountry, setHoveredCountry] = useState("");
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedOnCountryClick = useCallback(onCountryClick, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedSetHoveredCountry = useCallback(setHoveredCountry, []);

  return (
    <StyledMapContainer>
      <h2>{countryList[hoveredCountry]?.NAME ?? ""}</h2>
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Sphere
            fill="transparent"
            id="rsm-sphere"
            stroke={theme.colors["very-dark"]}
            strokeWidth={0.3}
          />
          <Graticule stroke={theme.colors["very-dark"]} strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Geography[] }) =>
              geographies.map((geo) => {
                const { rsmKey, properties } = geo;
                const countryId = properties.ISO_A3;
                const userCountry = userCountries[countryId];

                return (
                  <Country
                    geo={geo}
                    isBootyMode={isBootyMode}
                    key={rsmKey}
                    onClick={memoizedOnCountryClick}
                    selectedCountry={selectedCountry}
                    setHoveredCountry={memoizedSetHoveredCountry}
                    userCountry={userCountry}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </StyledMapContainer>
  );
};

export default Map;
