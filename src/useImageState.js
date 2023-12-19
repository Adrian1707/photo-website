import { useState, useEffect } from 'react';
import { fetchImages, downloadImage } from "./ImageFetcher";

const useImageState = (fetchParam) => {
  const [images, setImages] = useState({});
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetImages = async () => {
      try {
        setLoading(true);
        const fetchedImages = await fetchImages(fetchParam);
        const imagePromises = fetchedImages.map(imageUrl => downloadImage(imageUrl));
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
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetImages();
  }, [fetchParam]);

  return { images, setImages, imageSources, setImageSources, loading, setLoading };
};

export default useImageState;
