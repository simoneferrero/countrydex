import { Countries, Country, UserCountries } from "types/Countries";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";

import { SFW_ACHIEVEMENTS, BOOTY_ACHIEVEMENTS } from "constants/achievements";

import classNames from "classnames";
import styles from "./index.module.css";

interface Geography {
  geometry: any;
  rsmKey: string;
  svgPath: string;
  type: string;
  properties: Country;
}
interface Props {
  countryList: Countries;
  geoUrl: string;
  isBootyMode: boolean;
  onCountryClick: (country: string) => void;
  selectedCountry: string;
  userCountries: UserCountries;
}

const Map = ({
  countryList,
  geoUrl,
  isBootyMode,
  selectedCountry,
  onCountryClick,
  userCountries,
}: Props) => {
  const [hoveredCountry, setHoveredCountry] = useState("");

  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.countryName}>
        {countryList[hoveredCountry]?.NAME ?? ""}
      </h2>
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Sphere
            id="rsm-sphere"
            stroke="#5c4d36"
            strokeWidth={0.3}
            fill="transparent"
          />
          <Graticule stroke="#5c4d36" strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map((geo: Geography) => {
                const { rsmKey, properties } = geo;
                const userCountryAchievements = Object.keys(
                  userCountries[properties.ISO_A3] ?? {}
                ).filter(
                  (value) =>
                    Object.keys(
                      isBootyMode ? BOOTY_ACHIEVEMENTS : SFW_ACHIEVEMENTS
                    ).includes(value) &&
                    !!userCountries[properties.ISO_A3][value]
                ).length;

                return (
                  <Geography
                    key={rsmKey}
                    geography={geo}
                    className={classNames(styles.geography, {
                      [styles.selectedCountry]:
                        selectedCountry === properties.ISO_A3,
                      [styles.unfocusedCountry]:
                        selectedCountry &&
                        selectedCountry !== properties.ISO_A3,
                      [styles.bronze]:
                        !isBootyMode && userCountryAchievements === 1,
                      [styles.silver]:
                        userCountryAchievements === (isBootyMode ? 1 : 2),
                      [styles.gold]:
                        userCountryAchievements === (isBootyMode ? 2 : 3),
                    })}
                    onClick={() => onCountryClick(properties.ISO_A3)}
                    onMouseOver={() => setHoveredCountry(properties.ISO_A3)}
                    onMouseOut={() => setHoveredCountry("")}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
