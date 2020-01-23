import React, { Component } from "react";
import "./App.css";

import { Button } from "@blueprintjs/core";

import Routes from "routes";
import Header from "components/header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
