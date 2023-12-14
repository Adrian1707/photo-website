import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
const Flag = React.lazy(() => import('react-world-flags'));
import FlagGallery from './FlagGallery'

export default function Flags() {
  const [countries, setCountries] = useState({});
  const [favourites, setFavourites] = useState({});

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
      const favouriteIndex = headers.indexOf('Favourite')

      const countriesObj = {};
      let favouritesObj = {};
      const skip = ['Bali']
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row[visitedIndex] === 'y' && !skip.includes(row[nameIndex])) {
          const iso3 = row[iso3Index];
          const name = row[nameIndex];
          if(row[favouriteIndex] == 'y'){
            favouritesObj[iso3] = name;
          } else {
            countriesObj[iso3] = name;
          }
        }
      }

      setFavourites(favouritesObj);
      setCountries(countriesObj);
     });
  }

  useEffect(() => {
    fetchVisitedCountries()
  }, []);

  return (
    <div>
      <div className='flag-page'>
        {
          Object.keys(countries).length > 0 &&
          <h1 className="visited-message">{Object.keys(countries).length + Object.keys(favourites).length} Countries</h1>
        }
        <h1 className='favourites-text'>Favourites</h1>
        <FlagGallery countries={favourites} />
        <br/>
        <br/>
        <br/>
        <hr className="flag-separator"></hr>
        <FlagGallery countries={countries} />
      </div>

    </div>
  )
}
