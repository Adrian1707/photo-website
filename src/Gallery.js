import * as React from 'react';
import { galleryImages } from "./ImageFetcher";
import useImageState from './useImageState';
import { useParams } from 'react-router-dom';
import Loader from './Loader'
import HeroImage from './HeroImage'
import GalleryImage from './GalleryImage'

export default function Gallery() {
  let { albumName } = useParams();
  const { images, imageSources, loading } = useImageState(albumName);

  return (
    <div>
      {loading && <Loader />}
      <HeroImage albumName={albumName} />
      <div className="photogrid">
        {Object.keys(galleryImages(images)).map((key) => (
          <GalleryImage imageSources={imageSources} imageKey={key} />
        ))}
      </div>
    </div>
  )
}
