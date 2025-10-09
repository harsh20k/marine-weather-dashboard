import { useState } from 'react'
import { useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
  temperature?: number;
  windSpeed?: number;
  waveHeight?: number;
  } | null>(null);

  const fetchWeather = async () => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      "https://marine-api.open-meteo.com/v1/marine?latitude=44.65&longitude=-63.57&hourly=wave_height,wind_speed,air_temperature"
    );
    const data = await res.json();

    // Extract the latest (most recent hour) data
    const index = data.hourly.time.length - 1;
    setWeather({
      temperature: data.hourly.air_temperature[index],
      windSpeed: data.hourly.wind_speed[index],
      waveHeight: data.hourly.wave_height[index],
    });
  } catch (err) {
    setError("Failed to fetch data");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  fetchWeather();
}, []);

  const [count, setCount] = useState(0)

  return (
    <>
    <div className="page-wrap" style={{ textAlign: "center", marginTop: "50px" }}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
