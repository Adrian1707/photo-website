import * as React from 'react';
import { IMAGE_API } from "./ImageAPI"

export default function Gallery({imageSources, imageKey}) {

  const getImageClassName = (imgData) => {
    if(imgData && imgData.width >= 1900 && imgData.height <= 1700) {
      return 'img-container landscape'
    } else {
      return 'img-container portrait'
    }
  }

  const imageUrl = (key) => {
    return `${IMAGE_API}/${key}`
  }

  return (
    <div className={getImageClassName(imageSources[imageKey])}>
      <a target="_blank" href={imageUrl(imageKey)}><img className='photo' src={imageSources[imageKey] && imageSources[imageKey].src } /></a>
    </div>
  )
}
