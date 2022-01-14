import React, { useState, useEffect } from 'react'
import axios from 'axios'
const API_COUNTRY = 'https://restcountries.com/v3.1/all'

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
      <Countries countries={filteredCountries()} />
    </div>
  );
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <CountriesList countries={countries} />
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
const CountriesList = ({countries}) => {
  console.log("Countrieslist", countries)
  return (
    <ul>
      {countries.map(country => (
        <CountryItem 
          key={country.cca2} 
          country={country} 
        />
      ))}
    </ul>
  )
}

const CountryItem = ({country}) => {
  console.log("CountriesItem", country)
  return (
    <li>{country.name.common}</li>
  )
}

const CountryDetailed = ({country}) => {
  console.log("CountryDetailed", country)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital[0]} <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <CountryLanguages languages={country.languages} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
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

export default App;
