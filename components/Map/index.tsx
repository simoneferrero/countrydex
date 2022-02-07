import type { Countries, Country, UserCountries } from "types/Countries";

import { useState } from "react";
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

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import { StyledMapContainer, StyledGeography } from "./styled";

interface Geography {
  geometry: any;
  properties: Country;
  rsmKey: string;
  svgPath: string;
  type: string;
}
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
                const userCountryAchievements = Object.keys(
                  userCountries[countryId] ?? {}
                ).filter(
                  (achievementId) =>
                    Object.keys(
                      isBootyMode ? BOOTY_ACHIEVEMENTS : SFW_ACHIEVEMENTS
                    ).includes(achievementId) &&
                    !!userCountries[countryId][achievementId]
                ).length;

                return (
                  <StyledGeography
                    $id={countryId}
                    $isBootyMode={isBootyMode}
                    $selectedCountry={selectedCountry}
                    $userCountryAchievements={userCountryAchievements}
                    geography={geo}
                    key={rsmKey}
                    onClick={() => onCountryClick(countryId)}
                    onMouseOut={() => setHoveredCountry("")}
                    onMouseOver={() => setHoveredCountry(countryId)}
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
