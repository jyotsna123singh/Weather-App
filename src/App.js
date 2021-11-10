
import { useState } from 'react';
import './App.css';

const api = {
  key: "f4a6c07de708d2585dd32a16b3c99022",
  base: "https://api.openweathermap.org/data/2.5/"
}


var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
if(evt.key==="Enter"){
 fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(res => res.json())
  .then(result => {
    setWeather(result);
    setQuery('');
    console.log(result);

  });
}
  }

  return (

    <div className={(typeof weather.main != "undefined" ?  ((weather.main.temp > 16) ? "app warm" : "app") : "app" )}>
      <main>
        <div className="search-box">
        <input type="text"
        className="search-bar"
        placeholder="Search..."
        onChange = {e => setQuery(e.target.value)}
          value={query}
          onKeyPress = {search}
        ></input>

        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country} </div>
            <div className="date">{new Date().toDateString()}</div>

        </div>
        <div className="weather-box"> 
        <div className="temp"> {Math.round(weather.main.temp)}°C</div>
        <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
