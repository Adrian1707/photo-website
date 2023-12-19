import { useEffect } from 'react';
import { fetchImages, downloadImage } from "./ImageFetcher";

const useFetchAndSetImages = (fetchParam, setImageSources, setImages) => {
  useEffect(() => {
    const fetchAndSetImages = async () => {
      try {
        const images = await fetchImages(fetchParam);
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
  }, [fetchParam, setImageSources, setImages]); // dependencies
};

export default useFetchAndSetImages;
