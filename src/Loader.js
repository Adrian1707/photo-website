import * as React from 'react';
const { useEffect, useState } = React
import { Oval } from 'react-loader-spinner'

export default function Loader() {

  const isMobile = () => {
    return window.matchMedia("only screen and (max-width: 600px)").matches;
  }

  const loaderSize = () => {
    if(isMobile()) {
      return 300
    } else {
      return 500
    }
  }

  return (
    <div className="loader">
      <Oval
        height={loaderSize()}
        width={loaderSize()}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )

}
