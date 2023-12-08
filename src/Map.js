import * as React from 'react';
import * as ReactDOM from 'react-dom';
const MapChart = React.lazy(() => import("./MapChart"))

export default function Map() {
  return (
    <div>
      <MapChart />
    </div>
  )
}
