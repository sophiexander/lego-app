import "uikit/dist/css/uikit.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Navbar";
import LegoSet from "./LegoSet";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      test
      {/* <Navbar handleClick={"home"} /> */}
      <div>
        <LegoSet />
      </div>
    </div>
  );
}

export default App;
