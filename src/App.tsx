import "uikit/dist/css/uikit.css";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import LegoSetDisplay from "./LegoSetDisplay";

function App() {
  return (
    <div>
      {/* <Navbar handleClick={"home"} /> */}
      {/* <div> */}
      <LegoSetDisplay />
      {/* </div> */}
    </div>
  );
}

export default App;
