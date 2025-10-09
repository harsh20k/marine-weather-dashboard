import { useState, useEffect } from "react";
import "./App.css";

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
          "https://marine-api.open-meteo.com/v1/marine?latitude=44.65&longitude=-63.57&hourly=wave_height,wind_speed,sea_surface_temperature"
      );

      const data = await res.json();
      const index = data.hourly.time.length - 1;

      setWeather({
        temperature: data.hourly.sea_surface_temperature[index],
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌊 Marine Weather Dashboard</h1>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <p>📍 Halifax, Nova Scotia</p>
          <p>🌡️ Temperature: {weather.temperature} °C</p>
          <p>🌬️ Wind Speed: {weather.windSpeed} m/s</p>
          <p>🌊 Wave Height: {weather.waveHeight} m</p>
        </div>
      )}

      <button
        onClick={fetchWeather}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Refresh
      </button>
    </div>
  );
}

export default App;