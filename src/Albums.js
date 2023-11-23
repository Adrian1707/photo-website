import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage, heroImage, galleryImages } from "./ImageFetcher";
import { extractAndFormatFileName, getAlbumName } from './get_names'
import Nav from './Nav'

export default function Albums() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});

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
      <Nav />
      <div className="hero">
        <img className='landingphoto' src={heroImage(Object.keys(images), imageSources)}></img>
      </div>
      <div className="album-photogrid">
        {Object.keys(galleryImages(images)).map((key) => (
          <a href={getAlbumName(key)} key={key}>
            <div className="album-img-container">
              <div className="album-text">{extractAndFormatFileName(key, imageSources)}</div>
              <img className='album-photo' src={imageSources[key] && imageSources[key].src } />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
