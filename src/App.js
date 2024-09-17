import "./App.css";
import Navbar from "./components/ui/Navbar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";

function App() {
  return (
    <main className="main-bg">
      <Navbar />

      <CurrentWeather />
      <DailyWeather />
    </main>
  );
}

export default App;
