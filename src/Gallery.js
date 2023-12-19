import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage, heroImage, galleryImages } from "./ImageFetcher";
import { useParams } from 'react-router-dom';
import Loader from './Loader'
import { IMAGES_URL } from './ImageURL'

export default function Gallery() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(false)
  let { albumName } = useParams();

  useEffect(() => {
   const fetchAndSetImages = async () => {
     try {
       const images = await fetchImages(albumName);
       const imagePromises = images.map(imageUrl => downloadImage(imageUrl));
       const imageData = await Promise.all(imagePromises);
       imageData.forEach(({ imageSrc, imageUrl, imageWidth, imageHeight }) => {
         console.log(imageSrc)
         setImageSources(prevImageSources => ({
           ...prevImageSources,
           [imageUrl]: { src: imageSrc, imageWidth, imageHeight }
         }));
         setImages(prevImages => ({
           ...prevImages,
           [imageUrl]: imageWidth
         }));
       });
     } catch (err) {
       console.error(err);
     }
   };
   fetchAndSetImages();
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
    return `${IMAGES_URL}/${albumName}/hero.jpg`
  }

  const onLoad = () => {
    setLoading(false)
  }

  const imageUrl = (key) => {
    return `${IMAGES_URL}/${key}`
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl()}><img onLoad={onLoad} className='landingphoto' src={getHeroImageUrl()} /></a>
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
