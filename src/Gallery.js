import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage, heroImage, galleryImages } from "./ImageFetcher";
import { useParams } from 'react-router-dom';
import Nav from './Nav'

export default function Gallery() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  let { albumName } = useParams();

  useEffect(() => {
    fetchImages(
      albumName,
      images,
      setImages,
      imageSources,
      setImageSources
    )
  }, []);

  const getImageClassName = (imgData) => {
    if(imgData && imgData.width >= 1900 && imgData.height <= 1700) {
      return 'img-container landscape'
    } else {
      return 'img-container portrait'
    }
  }

  const getImageUrl = (img) => {
    return `https://adrianboothphotos.s3.eu-west-2.amazonaws.com/${img}`
  }

  const getHeroImageUrl = () => {
    return `https://adrianboothphotos.s3.eu-west-2.amazonaws.com/${albumName}/hero.jpg`
  }

  return (
    <div>
      <Nav />
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl()}><img className='landingphoto' src={heroImage(Object.keys(images), imageSources)} /></a>
      </div>
      <div className="photogrid">
        {Object.keys(galleryImages(images)).map((key) => (
          <div className={getImageClassName(imageSources[key])}>
            <a target="_blank" href={getImageUrl(key)}><img className='photo' src={imageSources[key] && imageSources[key].src } /></a>
          </div>
        ))}
      </div>
    </div>
  )
}
