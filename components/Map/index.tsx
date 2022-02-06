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
  selectedCountry: string;
  onCountryClick: (country: string) => void;
  userCountries: UserCountries;
}
const Map = ({
  countryList,
  geoUrl,
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
                const userCountryAchievements = Object.values(
                  userCountries[properties.ISO_A3] ?? {}
                ).filter(Boolean).length;

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
                      [styles.bronze]: userCountryAchievements === 1,
                      [styles.silver]: userCountryAchievements === 2,
                      [styles.gold]: userCountryAchievements === 3,
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
