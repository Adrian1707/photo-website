import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MapChart from "./MapChart";
import Nav from "./Nav";
import Subnav from "./Subnav";

export default function Map() {
  return (
    <div>
      <Nav />
      <Subnav />
      <MapChart />
    </div>
  )
}
