import * as React from 'react';
const AWS = require('aws-sdk/global');
const S3 = require('aws-sdk/clients/s3');
import { IMAGE_API } from './ImageAPI'

export const fetchImages = async (album) => {
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
 return new Promise((resolve, reject) => {
   s3.listObjectsV2(params, (err, data) => {
     if (err) {
       console.log("ERRORING")
       console.error(err);
       reject(err);
     } else {
       const images = shuffleImages(data.Contents
         .filter(object => object.Key.includes('.'))
         .map(object => object.Key));
       resolve(images);
     }
   });
 });
}

export const downloadImage = async (imageUrl, setImages, setImageSources) => {
 return new Promise((resolve, reject) => {
   fetch(`${IMAGE_API}/${imageUrl}`)
     .then(response => response.blob())
     .then(blob => {
       const imageSrc = URL.createObjectURL(blob);
       const img = new Image();
       img.src = imageSrc;
       img.onerror = (err) => {
         console.error(`Error loading image ${imageUrl}:`, err);
        };
       img.onload = () => {
         const imageWidth = img.naturalWidth;
         const imageHeight = img.naturalHeight;
         setImageSources(prevImageSources => ({
           ...prevImageSources,
           [imageUrl]: { src: imageSrc, imageWidth, imageHeight }
         }));
         setImages(prevImages => ({
           ...prevImages,
           [imageUrl]: imageWidth
         }));
       };
     })
     .catch(err => {
       console.error(err);
       reject(err);
     });
 });
};


export const listAlbums = async (album) => {
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
  return new Promise((resolve, reject) => {
   s3.listObjectsV2(params, (err, data) => {
     if (err) {
       console.error(err);
       reject(err);
     } else {
       console.log(data)
       resolve(data)
     }
   });
 });
}

const shuffleImages = (array) => {
  if(isMobile()) {
    return array
  } else {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

export const getHeroImageUrl = (albumName) => {
  return `${IMAGE_API}/${albumName}/hero.jpg`
}

const isMobile = () => {
  return window.matchMedia("only screen and (max-width: 600px)").matches;
}

export const galleryImages = (obj) => {
  if(isMobile()) {
    return Object.fromEntries(
       Object.entries(obj)
        .filter(([key]) => !key.includes('hero'))
        .sort(([, a], [, b]) => b - a)
      );
  } else {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !key.includes('hero')));
  }
}
