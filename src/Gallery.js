import * as React from 'react';
import { galleryImages, getHeroImageUrl } from "./ImageFetcher";
import useImageState from './useImageState';
import { useParams } from 'react-router-dom';
import Loader from './Loader'
import { IMAGE_API } from "./ImageAPI"

export default function Gallery() {
  let { albumName } = useParams();
  const { images, imageSources, loading } = useImageState(albumName);

  const getImageClassName = (imgData) => {
    if(imgData && imgData.width >= 1900 && imgData.height <= 1700) {
      return 'img-container landscape'
    } else {
      return 'img-container portrait'
    }
  }

  const onLoad = () => {
    setLoading(false)
  }

  const imageUrl = (key) => {
    return `${IMAGE_API}/${key}`
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl(albumName)}><img onLoad={onLoad} className='landingphoto' src={getHeroImageUrl(albumName)} /></a>
      </div>
      <div className="photogrid">
        {Object.keys(galleryImages(images)).map((key) => (
          <div className={getImageClassName(imageSources[key])}>
            <a target="_blank" href={imageUrl(key)}><img className='photo' src={imageSources[key] && imageSources[key].src } /></a>
          </div>
        ))}
      </div>
    </div>
  )
}
