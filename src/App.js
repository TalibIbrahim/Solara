import "./App.css";
import Navbar from "./components/ui/Navbar";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  return (
    <main className="h-screen">
      <Navbar />

      <CurrentWeather />
    </main>
  );
}

export default App;
