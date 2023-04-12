import { useState, useEffect } from 'react';

function App() {
  const api = {
    key: 'a7f7f56aabfdf5f7b8701312ef8ad1ca',
    base: 'https://api.openweathermap.org/data/2.5/',
  };
  const [date, setDate] = useState(new Date());
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  const timeText = currentDate.toLocaleTimeString('tr-TR');
  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 20
            ? 'app warm'
            : 'cold'
          : ''
      }
    >
      <div className="date">
        <p>
          {day < 10 ? '0' + day : day}/{month < 10 ? '0' + month : month}/{' '}
          {year}
        </p>
      </div>
      <p className="hour"> {timeText} </p>
      <div className="search">
        <input
          type="text"
          placeholder="Ara..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
        />
      </div>
      {typeof weather.main != 'undefined' ? (
        <div>
          <div className="location">
            <p>
              <span>Konum</span> : {weather.name}, {weather.sys.country}
            </p>
          </div>
          <div className="weather-info">
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="weather">{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
