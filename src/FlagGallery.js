import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
const Flag = React.lazy(() => import('react-world-flags'));

export default function FlagGallery({countries}) {
  return (
    <div className="flag-container">
      {Object.entries(countries).map(([code, name]) => (
        <div className="flag">
          <Flag code={code} height="200" width="350" />
          <p className="flag-name">{name}</p>
        </div>
      ))}
    </div>
  )

}
