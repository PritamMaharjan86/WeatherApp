import React, { useState } from 'react';
import Loader from './components/loader';
import { CiStar } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";



const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherReport, setWeatherReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleLocation = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setLocation(capitalized);
  };

  const apikey = process.env.REACT_APP_API_KEY;

  const handleWeather = async () => {
    if (!location) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherReport(data);
      } else {
        alert(data.message || 'Location not found');
      }
    } catch (error) {
      console.error('Error while fetching data', error);
      alert('Unable to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (weatherReport.name && !favorites.find(fav => fav.name === weatherReport.name)) {
      setFavorites([...favorites, {
        name: weatherReport.name,
        temp: (weatherReport.main.temp - 273.15).toFixed(1)
      }]);
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  const getWeatherBackground = () => {
    if (!weatherReport.weather) return 'clear-sky';

    const weather = weatherReport.weather[0].main.toLowerCase();

    switch (weather) {
      case 'clear':
        return 'clear-sky';
      case 'rain':
        return 'rainy';
      case 'clouds':
        return 'cloudy';
      default:
        return 'clear-sky';
    }
  };



  return (
    <div className={`flex flex-col items-center  min-h-screen ${getWeatherBackground()} bg-cover bg-center p-4 sm:p-6 md:p-8`}>

      <h1 className="font-amaranth text-3xl sm:text-4xl md:text-5xl font-extrabold text-center h-max text-yellow-300 mb-6 tracking-widest drop-shadow-lg hover:drop-shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 p-4 rounded-lg">WEATHER APP</h1>


      {clicked && favorites.length > 0 && (
        <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-200 font-amaranth">Favorite Locations</h2>
          <ul className="space-y-2">
            {favorites.map((fav, index) => (
              <li key={index}>
                <span className='font-bold text-xl font-amaranth'>{fav.name} : </span>
                <span className="text-blue-400 text-xl font-bold font-amaranth">{fav.temp}°C</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative">
        <input
          value={location}
          type="text"
          onChange={handleLocation}
          className="font-amaranth w-full mb-4 p-3 text-lg border rounded-lg shadow-sm bg-opacity-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 pr-10"
          placeholder="Enter a location"
        />

        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pb-3">
            <Loader />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleWeather}
          className="font-amaranth w-4/5 sm:w-2/3 md:w-1/3 py-3 text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-700 transition-all font-bold text-lg sm:text-xl"
        >
          Get Weather
        </button>
      </div>


      {weatherReport.name && (
        <div className="mt-4 p-4 bg-gray-200 bg-opacity-50 rounded-lg shadow-lg">

          <CiStar
            onClick={addToFavorites}
            className={`text-2xl float-end font-bold ${clicked ? 'text-red-500' : 'text-yellow-200'}`}
          />
          <p className="text-3xl text-white font-amaranth text-start">{weatherReport.name}</p>
          <div className="flex justify-between items-start w-full px-4">
            <div>
              <p className="text-5xl font-bold text-white font-amaranth mt-5 text-start">
                {(weatherReport.main.temp - 273.15).toFixed(1)}°c
              </p>
              <p className="text-lg font-amaranth text-white">
                {weatherReport.weather[0].main}
              </p>
            </div>

            <img
              src={`http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="w-20 h-20"
            />
          </div>

          <div className='flex flex-row w-full border-black p-4 mt-5 rounded-xl justify-between bg-gray-300 shadow-xl'>


            <div className='flex flex-col items-center'>
              <p className="text-2xl text-blue-600"><WiHumidity /></p>
              <p className="text-lg font-bold text-black">{weatherReport.main.humidity}%</p>
              <p className="text-sm text-gray-700">Humidity</p>
            </div>

            <div className='flex flex-col items-center'>
              <p className="text-2xl text-red-500"><FaTemperatureArrowUp /></p>
              <p className="text-lg font-bold text-black">
                {(weatherReport.main.temp_max - 273.15).toFixed(1)}°c
              </p>
              <p className="text-sm text-gray-700">Max</p>
            </div>

            <div className='flex flex-col items-center'>
              <p className="text-2xl text-blue-600"><FaTemperatureArrowDown /></p>
              <p className="text-lg font-bold text-black">
                {(weatherReport.main.temp_min - 273.15).toFixed(1)}°c
              </p>
              <p className="text-sm text-gray-700">Min</p>
            </div>

          </div>



          <div className="grid grid-cols-2 gap-4 pt-4 rounded-lg font-amaranth">
            <div className="text-center">
              <p className="text-lg ">Sunrise</p> <p className="text-2xl font-bold text-blue-400">{
                new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'UTC'
                }).format((weatherReport.sys.sunrise + weatherReport.timezone) * 1000)
              }</p>
            </div>
            <div className="text-center">
              <p className="text-lg ">Sunset</p>
              <p className="text-2xl font-bold text-blue-400">{
                new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'UTC'
                }).format((weatherReport.sys.sunset + weatherReport.timezone) * 1000)
              }</p>
            </div>
        
            <div className="text-center">
              <p className="text-lg">Pressure</p>
              <p className="text-2xl font-bold text-blue-400">{weatherReport.main.pressure} hPa</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg font-amaranth">
            <div className="text-center">
              <p className="text-lg">Wind Speed</p>
              <p className="text-2xl font-bold text-blue-400">
                {weatherReport.wind.speed} m/s
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg">Wind Direction</p>
              <p className="text-2xl font-bold text-blue-400">{weatherReport.wind.deg}°</p>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Weather;
