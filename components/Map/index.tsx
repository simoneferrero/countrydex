import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";

import styles from "./index.module.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => {
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
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#20292f"
                    stroke="#e4e5e6"
                    strokeWidth={0.4}
                    style={{
                      default: {
                        fill: "#20292f",
                        outline: "none",
                      },
                      hover: {
                        fill: "#36454f",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#36454f",
                        outline: "none",
                      },
                    }}
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
