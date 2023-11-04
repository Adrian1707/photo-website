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
       setImageSources((prevImageSources) => ({
         ...prevImageSources,
         [key]: imageSrc,
       }));
        console.log(imageSources)
     }
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
     images.forEach((key) => downloadImage(key, imageSources, setImageSources));
   }});
}
