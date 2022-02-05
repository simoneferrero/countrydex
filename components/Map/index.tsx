import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import axios from "axios";

import classnames from "classnames";
import styles from "./index.module.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface Country {
  ABBREV: string;
  CONTINENT: string;
  FORMAL_EN: string;
  GDP_MD_EST: number;
  GDP_YEAR: number;
  ISO_A2: string;
  ISO_A3: string;
  NAME: string;
  NAME_LONG: string;
  POP_EST: number;
  POP_RANK: number;
  POP_YEAR: number;
  REGION_UN: string;
  SUBREGION: string;
}
interface Countries {
  [key: string]: Country;
}
interface Geography {
  geometry: any;
  rsmKey: string;
  svgPath: string;
  type: string;
  properties: Country;
}
const Map = () => {
  const [countryList, setCountryList] = useState<Countries>({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      const response = await axios(geoUrl);

      setCountryList(
        response.data.objects.ne_110m_admin_0_countries.geometries.reduce(
          (countries: any, { properties }: { properties: Country }) => ({
            ...countries,
            [properties.ISO_A3]: properties,
          }),
          {}
        )
      );
    };

    getCountryData();
  }, []);

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
            {({ geographies }) =>
              geographies.map((geo: Geography) => {
                const { rsmKey, properties } = geo;
                return (
                  <Geography
                    key={rsmKey}
                    geography={geo}
                    className={classnames(styles.geography, {
                      [styles.selectedCountry]:
                        selectedCountry === properties.ISO_A3,
                      [styles.unfocusedCountry]:
                        selectedCountry &&
                        selectedCountry !== properties.ISO_A3,
                    })}
                    onClick={() =>
                      setSelectedCountry((prevCountry) =>
                        prevCountry === properties.ISO_A3
                          ? ""
                          : properties.ISO_A3
                      )
                    }
                    onMouseOver={() => setHoveredCountry(properties.ISO_A3)}
                    onMouseOut={() => setHoveredCountry("")}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
