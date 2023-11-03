import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage } from "./ImageFetcher";

export default function Albums() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});

  function extractAndFormatFileName(inputString) {
    const lastSlashIndex = inputString.lastIndexOf('/');
    const lastDotIndex = inputString.lastIndexOf('.');

    if (lastSlashIndex >= 0 && lastDotIndex > lastSlashIndex) {
      const extracted = inputString.substring(lastSlashIndex + 1, lastDotIndex);
      const formatted = extracted
        .replace(/_/g, ' ')
        .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());

      return formatted;
    } else {
      return '';
    }
  }

  function getAlbumName(input) {
    const parts = input.split('/');
    const lastPart = parts[parts.length - 1];
    const fileName = lastPart.split('.')[0];

    const formattedString = fileName.replace('_', ' ');

    return formattedString;
  }

  useEffect(() => {
    fetchImages(
      'covers',
      images,
      setImages,
      imageSources,
      setImageSources
    )
  }, []);


  return (
    <div>
      <header className="header">
        <h1 className="logo"><a href="#">Adrian Booth</a></h1>
          <ul className="main-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact / Links</a></li>
          </ul>
      </header>
      <div className="hero">
        <img className='landingphoto' src="./images/hero.jpg"></img>
      </div>
      <div className="photogrid">
        {Object.keys(images).map((key) => (
          <a href={getAlbumName(key)} key={key}>
            <div className="img-container">
              <img className='photo' src={imageSources[key]} />
              <div className="album-text">{extractAndFormatFileName(key)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
