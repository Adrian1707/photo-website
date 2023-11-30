import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function Subnav() {
  return (
    <div className="sub-nav">
      <ul className="nav-links">
        <li className="nav-item"><a href="/map">Map View</a></li>
        <li className="nav-item"><a href="/flags">Flag View</a></li>
      </ul>
    </div>
  )
}
