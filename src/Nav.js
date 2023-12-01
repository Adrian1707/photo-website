import * as React from 'react';

export default function Nav () {
  return (
  <nav className="navbar">
    <ul className="nav-links">
      <li className="nav-item"><a href="/">Countries</a></li>
      <li className="nav-item"><a href="/wildlife">Wildlife</a></li>
      <li className="nav-item"><a href="/candids">Candids</a></li>
      <li className="nav-item"><a href="/architecture">Architecture</a></li>
      <li className="nav-item"><a href="/landscape">Landscape</a></li>
      <li className="nav-item">
        <a>Countries I've visited</a>
        <ul className="dropdown">
          <li><a href="/map">Map</a></li>
          <li><a href="/flags">Flags</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  )
}
