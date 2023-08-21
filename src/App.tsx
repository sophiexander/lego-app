import "uikit/dist/css/uikit.css";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import LegoSetImage from "./LegoSetImage";

function App() {
  return (
    <div>
      test
      {/* <Navbar handleClick={"home"} /> */}
      <div>
        <LegoSetImage />
      </div>
    </div>
  );
}

export default App;
