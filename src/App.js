import "./App.css";
import Navbar from "./components/ui/Navbar";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  return (
    <main className="main-bg">
      <Navbar />

      <CurrentWeather />
    </main>
  );
}

export default App;
