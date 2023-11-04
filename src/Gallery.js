import * as React from 'react';
const { useEffect, useState } = React
import { fetchImages, downloadImage } from "./ImageFetcher";
import { useParams } from 'react-router-dom';

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

  const heroImage = (arr) => {
    const imgStr = arr.find(element => element.includes("hero"))
    console.log(imgStr)
    console.log(imageSources)
    return imageSources[imgStr]
  }

  const galleryImages = (arr) => {
    return arr.filter(element => !element.includes("hero"))
  }

  return (
    <div>
      <header className="header">
        <h1 className="logo"><a href="/">Main Gallery</a></h1>
          <ul className="main-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact / Links</a></li>
          </ul>
      </header>
      <div className="hero">
        <img className='landingphoto' src={heroImage(Object.keys(images))}></img>
      </div>
      <div className="photogrid">
        {galleryImages(Object.keys(images)).map((key) => (
          <div className="img-container">
            <img className='photo' src={imageSources[key]} />
          </div>
        ))}
      </div>
    </div>
  )
}
