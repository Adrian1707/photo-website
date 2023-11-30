import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import Flag from 'react-world-flags'
import Nav from "./Nav";
import Subnav from "./Subnav";

export default function Flags() {
  const [countries, setCountries] = useState({});

  const fetchVisitedCountries = () => {
    fetch("/countries.csv")
     .then(response => response.text())
     .then(data => {
      const csvData = data.replace(/\r\n/g, '\n');
      const lines = csvData.split('\n');
      const headers = lines[0].split(',');
      const visitedIndex = headers.indexOf('Visited');
      const iso3Index = headers.indexOf('ISO3');
      const nameIndex = headers.indexOf('Name');

      const countriesObj = {};
      const skip = ['Bali']
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        console.log(row)
        if (row[visitedIndex] === 'y' && !skip.includes(row[nameIndex])) {
          const iso3 = row[iso3Index];
          const name = row[nameIndex];
          countriesObj[iso3] = name;
        }
      }
      setCountries(countriesObj);
     });
  }

  useEffect(() => {
    fetchVisitedCountries()
  }, []);

  return (
    <div>
      <Nav />
      <div className='flag-page'>
        <div className="visited-message">
          <h1>{Object.keys(countries).length} Countries</h1>
        </div>
        <div className="flag-container">
          {Object.entries(countries).map(([code, name]) => (
            <div className="flag">
              <Flag code={code} height="200" width="350" />
              <p className="flag-name">{name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}