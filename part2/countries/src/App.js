import React, { useState, useEffect } from 'react'
import axios from 'axios'
const API_COUNTRY = 'https://restcountries.com/v3.1/all?' + 
  'fields=name,languages,capital,flags,cca2,population'
const API_KEY_OPENWEATHER= process.env.REACT_APP_API_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredCountries = () => (
    countries.filter(c => c.name.common.includes(filter))
  )

  useEffect(() => {
    axios
      .get(API_COUNTRY)
      .then(res => {
        setCountries(res.data)
      })
  },[])

  return (
    <div>
      <input onChange={handleFilter} value={filter} />
      <Countries 
        countries={filteredCountries()} 
        setFilter={setFilter} />
    </div>
  );
}

const Countries = ({countries, setFilter}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <CountriesList countries={countries} setFilter={setFilter} />
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetailed country={countries[0]} />
    )
  } else {
    return (
      <p>No matches found</p>
    )
  }
}

const CountriesList = ({countries, setFilter}) => {
  return (
    <ul>
      {countries.map(country => (
        <CountryItem 
          key={country.cca2} 
          country={country}
          setFilter={setFilter} 
        />
      ))}
    </ul>
  )
}

const CountryItem = ({country, setFilter}) => {
  const handleClick = () => setFilter(country.name.common)

  return (
    <li>
      {country.name.common} 
      <button onClick={handleClick}>show</button>
  </li>
  )
}

const CountryDetailed = ({country}) => {
  const {name, capital, population, languages} = country
  return (
    <div>
      <h1>{name.common}</h1>
      <p>
        capital {capital[0]} <br />
        population {population}
      </p>
      <h3>Spoken languages</h3>
      <CountryLanguages languages={languages} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      <Weather country={country} />
    </div>
  )
}

const CountryLanguages = ({languages}) => (
  <ul>
    {Object.entries(languages).map(([key, language]) => (
      <li key={key}>{language}</li>
    ))}
  </ul>
)

const Weather = ({country}) => {
  const {capital, cca2} = country
  const [weather, setWeather] = useState({})

  const degreeToCompass = (d) => {
    if (d >= 0 && d <= 11.25) { return "North" }
    else if (d > 348.75 && d <= 360) { return "North" }
    else if (d > 11.25 && d <= 33.75) { return "North North East" }
    else if (d > 33.75 && d <= 56.25) { return "North East" }
    else if (d > 56.25 && d <= 78.75) { return "East North East" }
    else if (d > 78.75 && d <= 101.25) { return "East" }
    else if (d > 101.25 && d <= 123.75) { return "East South East" }
    else if (d > 123.75 && d <= 146.25) { return "South East" }
    else if (d > 146.25 && d <= 168.75) { return "South South East" }
    else if (d > 168.75 && d <= 191.25) { return "South" }
    else if (d > 191.25 && d <= 213.75) { return "South South West" }
    else if (d > 213.75 && d <= 236.25) { return "South West" }
    else if (d > 236.25 && d <= 258.75) { return "West South West" }
    else if (d > 258.75 && d <= 281.25) { return "West" }
    else if (d > 281.25 && d <= 303.75) { return "West North West" }
    else if (d > 303.75 && d <= 326.25) { return "North West" }
    else if (d > 326.25 && d <= 348.75) { return "North North West" }
  }

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather` +
        `?q=${capital},${cca2}&appid=${API_KEY_OPENWEATHER}`)
      .then(res => {
        const {name} = res.data
        const heading = degreeToCompass(res.data.wind.deg)
        const temperature = (res.data.main.temp - 272.15).toFixed(1)
        const wind = (res.data.wind.speed * 3.6).toFixed(1)
        const icon = `http://openweathermap.org/img/wn/` +
          `${res.data.weather[0].icon}@2x.png`
        

        setWeather({
          name, temperature, wind, heading, icon
        })
      })
  },[])

  return (Object.entries(weather).length === 0) 
    ? <p>No weather data at the moment</p>
    : <WeatherDetails weather={weather} />
}

const WeatherDetails = ({weather}) => {
  const {name, temperature, wind, wind_heading, icon} = weather
  return (
    <div>
      <h3>Weather in {name}</h3>
      <b>temperature:</b> {temperature}°C <br />
      <img 
        src={icon} 
        alt="weather" /><br />
      <b>wind:</b> {wind}km/h {wind_heading}
    </div>
  )
}

export default App;
