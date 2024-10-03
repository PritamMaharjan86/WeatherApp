import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherReport, setWeatherReport] = useState({});

  const handleLocation = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setLocation(capitalized);
  };


  const apikey = process.env.REACT_APP_API_KEY;

  const handleWeather = async () => {

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`
      );
      const data = await res.json();
      setWeatherReport(data);
    } catch (error) {
      console.error('Error while fetching data', error);
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
    <div className={`flex justify-center items-center h-screen ${getWeatherBackground()} bg-cover bg-center`}>
      <div className="glass-card w-full max-w-lg p-8 bg-white shadow-2xl rounded-lg backdrop-blur-md ">
        <h1 className="font-amaranth text-5xl font-extrabold text-center text-yellow-300 mb-6 tracking-widest drop-shadow-lg hover:drop-shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 p-4 rounded-lg">
          WEATHER APP
        </h1>



        <input
          value={location}
          type="text"
          onChange={handleLocation}
          className="font-amaranth w-full mb-4 p-3 text-lg border rounded-lg shadow-sm bg-opacity-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Enter a location"
        />
        <button
          onClick={handleWeather}
          className="font-amaranth w-full py-3 text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-700 transition-all font-bold text-xl"
        >
          Get Weather
        </button>

        {weatherReport.name && (
          <div className="mt-6 p-6 bg-white bg-opacity-50 rounded-lg shadow-lg ">
            <div className="mb-4 text-center">


              <p className="text-3xl text-yellow-200 font-amaranth ">
                {weatherReport.name}
              </p>
              <p className="text-5xl font-bold text-blue-400 font-amaranth">
                {(weatherReport.main.temp - 273.15).toFixed(1)}°C
              </p>
              <div className='flex justify-center  '>
                <img src={`http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`} alt="Weather icon" /></div>
              <p className="text-xl font-amaranth">
                {weatherReport.weather[0].main}
              </p>
            </div>


            <div className="grid grid-cols-2 gap-4 pt-4 rounded-lg font-amaranth">
              <div className="text-center">
                <p className="text-lg">Humidity</p>
                <p className="text-2xl font-bold text-blue-400">{weatherReport.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-lg ">Pressure</p>
                <p className="text-2xl font-bold text-blue-400">{weatherReport.main.pressure} hPa</p>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 pt-4 rounded-lg font-amaranth">
              <div className="text-center">
                <p className="text-lg ">Temp Max</p>
                <p className="text-2xl font-bold text-blue-400">
                  {(weatherReport.main.temp_max - 273.15).toFixed(1)}°C
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg ">Temp Min</p>
                <p className="text-2xl font-bold text-blue-400">
                  {(weatherReport.main.temp_min - 273.15).toFixed(1)}°C
                </p>
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
                <p className="text-lg ">Wind Direction</p>
                <p className="text-2xl font-bold text-blue-400">
                  {weatherReport.wind.deg}°
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
