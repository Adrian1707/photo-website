import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage, heroImage, galleryImages } from "./ImageFetcher";
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'

export default function Gallery() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const imgStr = Object.keys(images).find(element => element.includes("hero"));
    if(imageSources[imgStr]) {
      setLoading(false);
    }
  }, [images, imageSources]);

  const getImageClassName = (imgData) => {
    if(imgData && imgData.width >= 1900 && imgData.height <= 1700) {
      return 'img-container landscape'
    } else {
      return 'img-container portrait'
    }
  }

  const getHeroImageUrl = () => {
    return `https://dq17sgdxquuwe.cloudfront.net/${albumName}/hero.jpg`
  }

  const isMobile = () => {
    return window.matchMedia("only screen and (max-width: 600px)").matches;
  }

  const loaderSize = () => {
    if(isMobile()) {
      return 300
    } else {
      return 500
    }
  }

  return (
    <div>
      <div className="loader">
        <Oval
          height={loaderSize()}
          width={loaderSize()}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
    </div>
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl()}><img className='landingphoto' src={heroImage(Object.keys(images), imageSources, setLoading)} /></a>
      </div>
      <div className="photogrid">
        {Object.keys(galleryImages(images)).map((key) => (
          <div className={getImageClassName(imageSources[key])}>
            <a target="_blank" href={key}><img className='photo' src={imageSources[key] && imageSources[key].src } /></a>
          </div>
        ))}
      </div>
    </div>
  )
}
