import * as React from 'react';
import AWS from 'aws-sdk';

export const downloadImage = async (key, imageSources, setImageSources, images, setImages) => {
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
       const img = new Image();
       img.src = imageSrc;
       img.onload = () => {
       const width = img.naturalWidth;
       const height = img.naturalHeight;
       setImageSources((prevImageSources) => ({
         ...prevImageSources,
         [key]: { src: imageSrc, width, height },
       }));
       setImages((prevImages) => ({
         ...prevImages,
         [key]: width,
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
     images.forEach((key) => downloadImage(key, imageSources, setImageSources, images, setImages));
   }});
}

const shuffleImages = (array) => {
  return array;
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
  // let sortedImages = Object.fromEntries(
  //    Object.entries(arr).sort(([, a], [, b]) => b - a)
  //   );
  // console.log("SORTED IMAGES")
  // console.log(sortedImages)
  // let fileNames = Object.keys(arr)
  // return fileNames.filter(element => !element.includes("hero"))

  let filteredObj = Object.fromEntries(
     Object.entries(arr)
      .filter(([key]) => !key.includes('hero'))
      .sort(([, a], [, b]) => b - a)
    );
    console.log("SORTED")
    console.log(filteredObj)
    return filteredObj
}
