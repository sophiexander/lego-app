import "uikit/dist/css/uikit.css";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import LegoSetDisplay from "./LegoSetDisplay";

function App() {
  const [showMove, setShowMove] = useState(false);
  const [showPilates, setShowPilates] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const handleClick = (buttonClicked: string) => {
    console.log("buttonClicked", buttonClicked);
    switch (buttonClicked) {
      case "move": {
        setShowPilates(false);
        setShowHome(false);
        setShowMove(true);
        break;
      }
      case "pilates": {
        setShowMove(false);
        setShowHome(false);
        setShowPilates(true);
        break;
      }
      case "home": {
        setShowMove(false);
        setShowPilates(false);
        setShowHome(true);
        break;
      }
    }
  };

  return (
    <>
      <Navbar handleClick={handleClick} />

      <LegoSetDisplay />
    </>
  );
}

export default App;
