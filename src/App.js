import './App.css';
import Inputfield from './Components/Inputfield';
import TopBar from './Components/TopBar';
import Location from './Components/Location';
import Weatherdetails from './Components/Weatherdetails';
import Forecast from './Components/Forecast';
import { useEffect, useState } from "react";
import getFormattedWeatherData from './Api/Weatherapi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [query, setQuery] = useState({ q: "chennai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return ;
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500";
    
    return "bg-gradient-to-r from-cyan-500 to-blue-500";
  };
  


  

  

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopBar setQuery={setQuery}/>
      <Inputfield setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
      <div>
      <Location weather={weather}/>
      <Weatherdetails weather={weather}/>
      <Forecast title="Hourly forecast" items={weather.hourly}/>
      <Forecast title="Daily forecast" items={weather.daily}/>
      </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
      
  );
}

export default App;
