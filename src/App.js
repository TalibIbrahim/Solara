import "./App.css";
import Navbar from "./components/ui/Navbar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <main className="main-bg">
      <SkeletonTheme
        baseColor="rgba(212, 212, 212, 0.2)"
        highlightColor="rgba(169, 169, 169, 0.2)"
      >
        <Navbar />
        <CurrentWeather />
        <DailyWeather />
      </SkeletonTheme>
    </main>
  );
}

export default App;
