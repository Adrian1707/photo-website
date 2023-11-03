import * as React from 'react';
const { useEffect, useState } = React
import AWS from 'aws-sdk';
export function Gallery() {
  return (
    <div>
      <header class="header">
        <h1 class="logo"><a href="#">Adrian Booth</a></h1>
          <ul class="main-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact / Links</a></li>
          </ul>
      </header>
      <div class="hero">
        <img class='landingphoto' src="./images/hero.jpg"></img>
      </div>
    </div>
  )
}
