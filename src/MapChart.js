import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/countries.csv`).then((data) => {
      console.log(data)
      setData(data);
    });
  }, []);

  const handleHover = (d, geo) => {
    console.log("HOVERING")
    console.log(d)
    console.log(geo)
  }

  return (
    <ComposableMap
      projectionConfig={{
        // this rotate value provides us with control to rotate the map westward or eastwood.
        // changing to -200 will center the pacific ocean in the map for instance
        rotate: [-10, 0, 0],
        scale: 160
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              let visited = d && d.Visited.toLowerCase() == "y"
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visited ? "#c5efb7" : "#847b7b"}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  onMouseEnter={() => handleHover(d, geo)}
                  style={{
                   hover: {
                     fill: "#99c5ed",
                     transition: "all 300ms"
                   },
                 }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
