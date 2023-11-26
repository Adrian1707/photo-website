import React, { useEffect, useState, useCallback } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {useNavigate} from 'react-router-dom'
import { listAlbums } from "./ImageFetcher";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    csv(`/countries.csv`).then((data) => {
      setData(data);
    });
    const getAlbums = async () => {
      const data = await listAlbums("covers");
      let arr = data.Contents.map((album) =>  album.Key)
      let countryNames = arr.map(item => {
         let parts = item.split('/');
         let countryName = parts[1].split('.')[0];
         return countryName.toLowerCase();
      });
      setAlbums(countryNames)
    };
    getAlbums()
  }, []);

  const handleHover = (d, geo) => {
    let countryName = d.Name.toLowerCase()
    console.log(countryHasAlbum(countryName))
  }

  const handleClick = (name) => {
    let countryName = name.toLowerCase()
    if(!countryHasAlbum(countryName)){
      alert("Country has no photo album yet")
      return undefined
    }
    navigate(`/${countryName}`);
  }

  const countryHasAlbum = (countryName) => {
    return albums.includes(countryName)
  }

  const countryColour = (visited, countryName) => {
    if(visited && countryHasAlbum(countryName)) {
      return "#5d954a"
    } else if (visited) {
      return "#c5efb7"
    } else {
      return "#847b7b"
    }
  }

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          // this rotate value provides us with control to rotate the map westward or eastwood.
          // changing to -200 will center the pacific ocean in the map for instance
          rotate: [-10, 0, 0],
          center: [0, -23],
          scale: 150
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
                let countryName = d && d.Name.toLowerCase()
                let cursor = countryHasAlbum(countryName) ? "pointer" : "no-drop"
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(d.Name)}
                    fill={countryColour(visited, countryName)}
                    stroke="#FFF"
                    strokeWidth={0.5}
                    onMouseEnter={() => handleHover(d, geo)}
                    style={{
                      default: {
                          outline: 'none'
                      },
                      hover: {
                          outline: 'none',
                          fill: "#99c5ed",
                          transition: "all 300ms",
                          cursor: cursor
                      },
                      pressed: {
                          outline: 'none'
                      }
                   }}
                  />
                );
              })
            }
          </Geographies>
        )}
        <Marker coordinates={[-130, -10]} fill="#777">
        <text textAnchor="middle" fill="#5d954a">
          Visited and has album
        </text>
      </Marker>
      <Marker coordinates={[-130, -20]} fill="#777">
      <text textAnchor="middle" fill="#c5efb7">
        Visited, no album
      </text>
    </Marker>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
