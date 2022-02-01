import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";

import classnames from "classnames";
import styles from "./index.module.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className={styles.mapContainer}>
      <ComposableMap>
        <ZoomableGroup zoom={1} center={[0, -10]}>
          <Sphere
            id="rsm-sphere"
            stroke="#e4e5e6"
            strokeWidth={0.3}
            fill="transparent"
          />
          <Graticule stroke="#e4e5e6" strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { rsmKey, properties } = geo;
                return (
                  <Geography
                    key={rsmKey}
                    geography={geo}
                    className={classnames(styles.geography, {
                      [styles.selectedCountry]:
                        selectedCountry === properties.ISO_A3,
                    })}
                    onClick={() =>
                      setSelectedCountry((prevCountry) =>
                        prevCountry === properties.ISO_A3
                          ? null
                          : properties.ISO_A3
                      )
                    }
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
