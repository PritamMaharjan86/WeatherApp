import { useState } from 'react';
import Loader from './components/loader';
import { CiStar } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';



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
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherReport(data);
      } else {
        // alert(data.message || 'Location not found');
        toast.error("Location not found");

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

    switch (weather.toLowerCase()) {
      case 'clear':
        return 'clear-sky';
      case 'sunny':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'shower rain':
        return 'rainy';
      case 'thunderstorm':
        return 'thunderstorm';
      case 'snow':
        return 'snow';
      case 'fog':
        return 'fog';
      case 'haze':
        return 'haze';
      case 'mist':
        return 'mist';
      case 'overcast':
        return 'overcast';
      case 'wind':
      case 'windy':
        return 'windy';
      default:
        return 'clear-sky';
    }

  };



  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center ${getWeatherBackground()} bg-cover bg-center bg-no-repeat p-4 sm:p-6 md:p-8`}>


      <h1 className="font-amaranth text-3xl sm:text-4xl md:text-5xl font-extrabold text-center h-max text-yellow-300 mb-6 tracking-widest drop-shadow-lg hover:drop-shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 p-4 rounded-lg">WEATHER APP</h1>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setLocation('');
              handleWeather();
            }
          }}
          className="font-amaranth w-full mb-4 p-3 text-lg border rounded-lg shadow-sm bg-opacity-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 pr-10"
          placeholder="Enter a location"
        />

        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pb-3">
            <Loader />
          </div>
        )}
      </div>



      {weatherReport.name && (
        <div className="mt-4 p-4  bg-gray-200 bg-opacity-50 rounded-3xl shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/4 h-full">
          <CiStar
            onClick={addToFavorites}
            className={`text-2xl float-end font-bold ${clicked ? 'text-red-500' : 'text-yellow-200'}`}
          />
          <p className="text-5xl font-bold text-white font-amaranth text-start">{weatherReport.name}</p>
          <p className="text-white text-sm ml-2 mt-2">
            {
              (() => {
                const offset = weatherReport.timezone;
                const utcNow = Date.now();
                const localTime = new Date(utcNow + offset * 1000);

                return localTime.toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                });
              })()
            }
          </p>



          <div className="flex justify-between items-start w-full px-4 ">
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


          <div className='flex flex-row w-full p-4 mt-5 rounded-xl justify-between bg-gray-300 shadow-xl'>


            <div className='flex flex-col items-center'>
              <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750843411/weather/humidity_r9mzzr.png' alt='humidity'></img></p>
              <p className="text-md font-bold text-blue-500">{weatherReport.main.humidity}%</p>
              <p className="text-sm">Humidity</p>
            </div>

            <div className='flex flex-col items-center'>
              <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750844034/weather/high-temperature_ptwug6.png' alt='max temperature'></img></p>
              <p className="text-md font-bold text-blue-500">
                {(weatherReport.main.temp_max - 273.15).toFixed(1)}°c
              </p>
              <p className="text-sm">High</p>
            </div>

            <div className='flex flex-col items-center'>
              <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750844034/weather/low-temperature_zr5lwi.png' alt='min temperature'></img></p>
              <p className="text-md font-bold text-blue-500">
                {(weatherReport.main.temp_min - 273.15).toFixed(1)}°c
              </p>
              <p className="text-sm">Low</p>
            </div>

          </div>

          <div className="p-4 mt-5 rounded-xl bg-gray-300 shadow-xl flex flex-col items-center justify-center space-y-4 gap-y-2">

            <div className="flex flex-row w-full justify-center items-center">
              <div className="flex flex-col items-center w-1/2">
                <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750928555/weather/sunrise_smvr3f.png' alt='sunrise'></img></p>
                <p className='text-sm'>Sunrise</p>

                <p className="text-md font-bold text-blue-400">
                  {
                    new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'UTC'
                    }).format((weatherReport.sys.sunrise + weatherReport.timezone) * 1000)
                  }
                </p>
              </div>

              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-2" />

              <div className="flex flex-col items-center w-1/2 ">
                <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750928555/weather/sunset_nqocdv.png' alt='sunset'></img></p>
                <p className='text-sm'>Sunset</p>
                <p className="text-md font-bold text-blue-400">
                  {
                    new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'UTC'
                    }).format((weatherReport.sys.sunset + weatherReport.timezone) * 1000)
                  }
                </p>
              </div>
            </div>


            <div className="flex flex-row w-full justify-center items-center">
              <div className="flex flex-col items-center w-1/2">
                <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750929295/weather/wind_drw1vv.png' alt='wind speed'></img></p>
                <p className='text-sm'>Wind Speed</p>
                <p className="text-md font-bold text-blue-400">
                  {weatherReport.wind.speed} m/s
                </p>
              </div>


              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-2" />

              <div className="flex flex-col items-center w-1/2">
                <p><img className='w-6 h-6' src='https://res.cloudinary.com/dedpvue13/image/upload/v1750929481/weather/weather-vane_vzuxhl.png' alt='wind direction'></img></p>
                <p className='text-sm '>Wind Direction</p>
                <p className="text-md font-bold text-blue-400">
                  {weatherReport.wind.deg}°
                </p>
              </div>
            </div>

          </div>

          <div className="bg-gray-300 shadow-xl rounded-xl p-4 text-black w-full max-w-sm space-y-3 text-sm sm:text-base mt-5">

            <div className="relative pb-3">
              <div className="flex justify-between items-center">

                <span className="flex items-center opacity-80 text-sm">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://res.cloudinary.com/dedpvue13/image/upload/v1751112129/weather/hot_nkiuhk.png"
                    alt="feels like"
                  />
                  Feels Like
                </span>
                <span className="font-mono font-bold text-blue-400">
                  {(weatherReport.main.feels_like - 273.15).toFixed(1)}°C
                </span>
              </div>

            </div>

            <div className="relative pb-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center opacity-80 text-sm">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://res.cloudinary.com/dedpvue13/image/upload/v1751111974/weather/sea-level_dnbddl.png"
                    alt="sea level"
                  />
                  Sea Level
                </span>

                <span className="font-mono font-bold text-blue-400">
                  {weatherReport.main.sea_level} hPa
                </span>
              </div>

            </div>

            <div className="relative pb-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center opacity-80 text-sm">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://res.cloudinary.com/dedpvue13/image/upload/v1751111323/weather/high-tide_xuussp.png"
                    alt="ground level"
                  />
                  Ground Level
                </span>

                <span className="font-mono font-bold text-blue-400">
                  {weatherReport.main.grnd_level} hPa
                </span>
              </div>

            </div>

            <div className="relative pb-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center opacity-80 text-sm">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://res.cloudinary.com/dedpvue13/image/upload/v1751166129/weather/pressure_1_f1vh1q.png"
                    alt="pressure"
                  />
                  Pressure
                </span>

                <span className="font-mono font-bold text-blue-400">
                  {weatherReport.main.pressure} hPa
                </span>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>

  );
};

export default Weather;
