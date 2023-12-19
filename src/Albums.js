import * as React from 'react';
import { galleryImages } from "./ImageFetcher";
import useImageState from './useImageState';
import { extractAndFormatFileName, getAlbumName } from './get_names'
import Loader from './Loader'
import HeroImage from './HeroImage'

export default function Albums() {
  const albumName = 'covers';
  const { images, imageSources, loading } = useImageState(albumName);

  return (
    <div>
      {loading && <Loader />}
      <HeroImage albumName='covers' />
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
