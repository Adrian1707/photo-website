import * as React from 'react';
import AWS from 'aws-sdk';

export const downloadImage = async (key, imageSources, setImageSources) => {
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
       // Create an Image object
       const img = new Image();
       img.src = imageSrc;
       img.onload = () => {
       // Get the dimensions of the image
       const width = img.naturalWidth;
       const height = img.naturalHeight;
       // console.log("WIDTH AND HEIGHT")
       // console.log(width)
       // console.log(height)
         // Store the image source and dimensions in the state
       setImageSources((prevImageSources) => ({
         ...prevImageSources,
         [key]: { src: imageSrc, width, height },
       }));
     }}
   });
 };

export const fetchImages = async (album, images, setImages, imageSources, setImageSources) => {
  const params = {
   Bucket: 'adrianboothphotos',
   Prefix: `${album}/`,
  };
  AWS.config.update({
   accessKeyId: process.env.ACCESS_KEY_ID,
   secretAccessKey: process.env.SECRET_ACCESS_KEY,
   region: 'eu-west-2',
  });
  const s3 = new AWS.S3();
  s3.listObjectsV2(params, (err, data) => {
   if (err) {
     console.log("ERRORING")
     console.error(err);
   } else {
     const images = shuffleImages(data.Contents
      .filter(object => object.Key.includes('.'))
      .map(object => object.Key));
     setImages(images.reduce((acc, key) => ({ ...acc, [key]: null }), {}));
     images.forEach((key) => downloadImage(key, imageSources, setImageSources));
   }});
}

const shuffleImages = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const heroImage = (arr, imageSources) => {
  const imgStr = arr.find(element => element.includes("hero"))
  return imageSources[imgStr] && imageSources[imgStr].src
}

export const galleryImages = (arr) => {
  return arr.filter(element => !element.includes("hero"))
}
