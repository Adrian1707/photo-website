import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage, heroImage, galleryImages } from "./ImageFetcher";
import { extractAndFormatFileName, getAlbumName } from './get_names'
import Loader from './Loader'
import { IMAGES_URL } from './ImageURL'
export default function Albums() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   const fetchAndSetImages = async () => {
     try {
       const images = await fetchImages('covers');
       const imagePromises = images.map(imageUrl => downloadImage(imageUrl));
       const imageData = await Promise.all(imagePromises);
       imageData.forEach(({ imageSrc, imageUrl, imageWidth, imageHeight }) => {
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

  const onLoad = () => {
    setLoading(false)
  }

  const getHeroImageUrl = () => {
    return `${IMAGES_URL}/covers/hero.jpeg`
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="hero">
        <a target="_blank" href={getHeroImageUrl()}><img onLoad={onLoad} className='landingphoto' src={getHeroImageUrl()} /></a>
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
