import * as React from 'react';
const { useEffect, useState } = React
import { galleryImages, getHeroImageUrl } from "./ImageFetcher";
import useFetchAndSetImages from './useFetchAndSetImages';
import { extractAndFormatFileName, getAlbumName } from './get_names'
import Loader from './Loader'
import { IMAGE_API } from "./ImageAPI"

export default function Albums() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true)
  useFetchAndSetImages('covers', setImageSources, setImages);

  const onLoad = () => {
    setLoading(false)
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl('covers')}><img onLoad={onLoad} className='landingphoto' src={getHeroImageUrl('covers')} /></a>
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
