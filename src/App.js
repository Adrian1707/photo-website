import * as React from 'react';
const { useEffect, useState } = React
import AWS from 'aws-sdk';
export function App() {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});

  function extractAndFormatFileName(inputString) {
    const lastSlashIndex = inputString.lastIndexOf('/');
    const lastDotIndex = inputString.lastIndexOf('.');

    if (lastSlashIndex >= 0 && lastDotIndex > lastSlashIndex) {
      const extracted = inputString.substring(lastSlashIndex + 1, lastDotIndex);
      const formatted = extracted
        .replace(/_/g, ' ')
        .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());

      return formatted;
    } else {
      return '';
    }
  }

  const downloadImage = (key) => {
     const params = {
       Bucket: 'adrianboothphotos',
       Key: key,
     };
     const s3 = new AWS.S3();
     s3.getObject(params, (err, data) => {
       if (err) {
         console.error(err);
       } else {
         const imageSrc = `data:image/jpeg;base64,${data.Body.toString('base64')}`;
         setImageSources((prevImageSources) => ({
           ...prevImageSources,
           [key]: imageSrc,
         }));
          console.log(imageSources)
       }
     });
   };

  useEffect(() => {
    const params = {
     Bucket: 'adrianboothphotos',
     Prefix: 'covers/',
    };
    AWS.config.update({
     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     region: 'eu-west-2',
    });
    const s3 = new AWS.S3();
    console.log(s3)
    s3.listObjectsV2(params, (err, data) => {
     if (err) {
       console.log("ERRORING")
       console.error(err);
     } else {
       const images = data.Contents
        .filter(object => object.Key.includes('.'))
        .map(object => object.Key);
       setImages(images.reduce((acc, key) => ({ ...acc, [key]: null }), {}));
       images.forEach((key) => downloadImage(key));
     }});
  }, []);


  return (
    <div>
      <header class="header">
        <h1 class="logo"><a href="#">Adrian Booth</a></h1>
          <ul class="main-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact / Links</a></li>
          </ul>
      </header>
      <div class="hero">
        <img class='landingphoto' src="./images/hero.jpg"></img>
      </div>
      <div class="photogrid">
        {Object.keys(images).map((key) => (
          <a href="/" key={key}>
            <div class="img-container">
              <img class='photo' src={imageSources[key]} />
              <div class="album-text">{extractAndFormatFileName(key)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
