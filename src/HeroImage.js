import * as React from 'react';
import { getHeroImageUrl } from "./ImageFetcher";

export default function HeroImage({albumName}) {

  return(
    <div className="hero">
      <a target="_blank" href={getHeroImageUrl(albumName)}>
        <img className='landingphoto' src={getHeroImageUrl(albumName)} />
      </a>
    </div>
  )
}
