import * as React from 'react';
import Albums from "./Albums";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Oval } from 'react-loader-spinner'
export default function App() {

  return (
    <div>
      <Nav />
      <Albums />
    </div>
  )
}
