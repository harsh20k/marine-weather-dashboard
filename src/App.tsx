import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeather] = useState<{
    times: string[];
    temperatures: number[];
    waveHeights: number[];
  } | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
          "https://marine-api.open-meteo.com/v1/marine?latitude=44.65&longitude=-63.57&hourly=wave_height,sea_surface_temperature"
      );

      const data = await res.json();

      if (!data.hourly || !data.hourly.time || data.hourly.time.length === 0) {
        throw new Error("Invalid data structure received");
      }

      setWeather({
        times: data.hourly.time,
        temperatures: data.hourly.sea_surface_temperature,
        waveHeights: data.hourly.wave_height,
      });

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1>🌊 Marine Weather Dashboard</h1>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <p>📍 Halifax, Nova Scotia</p>
          <p>Total readings: {weatherData.times.length} hours</p>

          <div style={{ 
            maxHeight: "500px", 
            overflowY: "scroll", 
            marginTop: "20px",
            border: "1px solid #ccc"
          }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse"
            }}>
              <thead style={{ 
                position: "sticky", 
                top: 0, 
                backgroundColor: "#253f49ff",
                zIndex: 1
              }}>
                <tr>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>🌡️ Temperature (°C)</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>🌊 Wave Height (m)</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.times.map((time, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {new Date(time).toLocaleString()}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {weatherData.temperatures[index]}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {weatherData.waveHeights[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
