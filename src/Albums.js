import * as React from 'react';
const { useEffect, useState } = React
import AWS from 'aws-sdk';
import { fetchImages, downloadImage } from "./ImageFetcher";

export function Albums() {
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
      <header class="header">
        <h1 class="logo"><a href="#">Adrian Booth</a></h1>
          <ul class="main-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact / Links</a></li>
          </ul>
      </header>
      <div class="hero">
        <img class='landingphoto' src="./images/hero.jpg"></img>
      </div>
      <div class="photogrid">
        {Object.keys(images).map((key) => (
          <a href="/" key={key}>
            <div class="img-container">
              <img class='photo' src={imageSources[key]} />
              <div class="album-text">{extractAndFormatFileName(key)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
