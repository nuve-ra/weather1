import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import { useState } from 'react';
import dateFormat from 'dateformat';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [city, setCity] = useState("");
  const [currentConditions, setCurrentConditions] = useState({});
  const notify = () => toast("Please enter a valid city name");

  const getWeatherbyCity = async () => {
    if (!city) return; // Check if city is empty
  
    const apiKey = "KXBMNDKSSUK6DYX52YKPY87KV";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      setCurrentConditions(response.data.currentConditions); // Update with Visual Crossing data
      console.log(response.data); // Log the data for debugging
    } catch (error) {
      notify()
      console.error("Error fetching the weather data:", error);
    }
  
    setCity(""); // Clear the input field
  };
  
  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app">
    <ToastContainer/>

      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {currentConditions.temp && (
        <div className="content">
          <div className="location d-flex">
            <MapPin />
            <h2>{city}</h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img
              src={`https://www.visualcrossing.com/img/icons/${currentConditions.icon}.svg`}
              alt=""
            />
            <h3>{currentConditions.conditions}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{currentConditions.temp} <span>&deg;C</span></h1>
            <h3>Feels Like {currentConditions.feelslike} <span>&deg;C</span></h3>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>Wind is {currentConditions.windspeed} km/h in {currentConditions.winddir}&deg;</h3>
          </div>
        </div>
      )}

      {!currentConditions.temp && (
        <div className="content">
          <h4>No Data found!</h4>
        </div>
      )}
      
    </div>
  );
}

export default App;
