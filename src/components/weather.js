import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherReport, setWeatherReport] = useState({});

  const handleLocation = (e) => {
    setLocation(e.target.value);
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
      <div className="glass-card w-full max-w-lg p-8 bg-white shadow-2xl rounded-lg backdrop-blur-md">
        <h1 className="text-5xl font-extrabold text-center text-gray-100 mb-6 tracking-widest">
          WEATHER APP
        </h1>
        <input
          value={location}
          type="text"
          onChange={handleLocation}
          className="w-full mb-4 p-3 text-lg border rounded-lg shadow-sm bg-opacity-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Enter a location"
        />
        <button
          onClick={handleWeather}
          className="w-full py-3 text-white bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-700 transition-all font-bold text-xl"
        >
          Get Weather
        </button>

        {weatherReport.name && (
          <div className="mt-6 p-6 bg-white bg-opacity-50 rounded-lg shadow-lg">
            <div className="mb-4 text-center">
              <p className="text-3xl font-bold text-yellow-300">
                {weatherReport.name}
              </p>
              <p className="text-5xl font-bold text-blue-300">
                {(weatherReport.main.temp - 273.15).toFixed(1)}°C
              </p>
              <p className="text-xl text-gray-300">
                {weatherReport.weather[0].main}
              </p>
            </div>

       
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-gray-200">Humidity</p>
                <p className="text-2xl font-bold text-blue-200">{weatherReport.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-200">Pressure</p>
                <p className="text-2xl font-bold text-blue-200">{weatherReport.main.pressure} hPa</p>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-2 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-gray-200">Temp Max</p>
                <p className="text-2xl font-bold text-yellow-300">
                  {(weatherReport.main.temp_max - 273.15).toFixed(1)}°C
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-200">Temp Min</p>
                <p className="text-2xl font-bold text-blue-300">
                  {(weatherReport.main.temp_min - 273.15).toFixed(1)}°C
                </p>
              </div>
            </div>

    
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-black">Wind Speed</p>
                <p className="text-2xl font-bold text-blue-300">
                  {weatherReport.wind.speed} m/s
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-200">Wind Direction</p>
                <p className="text-2xl font-bold text-blue-300">
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
