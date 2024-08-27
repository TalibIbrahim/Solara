import "./App.css";
import Navbar from "./components/ui/Navbar";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  return (
    <div className="bg-neutral-900">
      <Navbar />
      <CurrentWeather />
    </div>
  );
}

export default App;
