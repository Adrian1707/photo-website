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
        fetchedImages.map(imageUrl => downloadImage(imageUrl, setImages, setImageSources));
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
