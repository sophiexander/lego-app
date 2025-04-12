import "uikit/dist/css/uikit.css";
import "./App.css";
import Navbar from "./Navbar";
import LegoSetDisplay from "./LegoSetDisplay";

function App() {
  return (
    <>
      <Navbar handleClick={() => {}} />

      <LegoSetDisplay />
    </>
  );
}

export default App;
