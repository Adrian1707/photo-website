import * as React from 'react';
import { galleryImages, getHeroImageUrl } from "./ImageFetcher";
import useImageState from './useImageState';
import { extractAndFormatFileName, getAlbumName } from './get_names'
import Loader from './Loader'

export default function Albums() {
  const { images, imageSources, loading } = useImageState('covers');

  return (
    <div>
      {loading && <Loader />}
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl('covers')}><img className='landingphoto' src={getHeroImageUrl('covers')} /></a>
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
