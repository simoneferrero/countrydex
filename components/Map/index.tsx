import type { Geography } from "types/Countries";

import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import { useAppSelector } from "app/hooks";
import { countriesSelectors } from "features/countries/countriesSlice";

import {
  ComposableMap,
  Geographies,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import Country from "./Country";

import { StyledMapContainer } from "./styled";

const GEO_URL = process.env.NEXT_PUBLIC_GEO_URL || "";

const Map = () => {
  const [hoveredCountry, setHoveredCountry] = useState("");
  const countries = useAppSelector(countriesSelectors.selectEntities);
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedSetHoveredCountry = useCallback(setHoveredCountry, []);

  return (
    <StyledMapContainer>
      <h2>{countries[hoveredCountry]?.NAME ?? ""}</h2>
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Sphere
            fill="transparent"
            id="rsm-sphere"
            stroke={theme.colors["very-dark"]}
            strokeWidth={0.3}
          />
          <Graticule stroke={theme.colors["very-dark"]} strokeWidth={0.3} />
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Geography[] }) =>
              geographies.map((geo) => (
                <Country
                  geo={geo}
                  key={geo.rsmKey}
                  setHoveredCountry={memoizedSetHoveredCountry}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </StyledMapContainer>
  );
};

export default Map;
