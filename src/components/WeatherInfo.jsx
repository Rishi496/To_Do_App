import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const WeatherInfo = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=thanjavur&appid=5d9aa9cdc1930d5fe11ce99a957df36b&units=Metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return null;
    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("clear")) return <WbSunnyIcon fontSize="large" />;
    if (main.includes("cloud")) return <CloudIcon fontSize="large" />;
    if (main.includes("rain") || main.includes("drizzle"))
      return <WaterDropIcon fontSize="large" />;
    if (main.includes("thunder")) return <ThunderstormIcon fontSize="large" />;
    return <WbSunnyIcon fontSize="large" />;
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          {getWeatherIcon()}
          <div>
            <Typography variant="h6">Current Weather</Typography>
            <Typography variant="body1">
              {weather.name}: {Math.round(weather.main.temp)}°C,{" "}
              {weather.weather[0].description}
            </Typography>
            <Typography variant="body2">
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed}{" "}
              m/s
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
