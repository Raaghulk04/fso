import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryForm = ({searchCountry, handleOnChangeSearchCountry}) => {
	return (
		<form>
			<div>
				find countries <input value={searchCountry} onChange={handleOnChangeSearchCountry}/>
			</div>
		</form>
	)
}

const Countries = ({ resultCountries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    if (resultCountries.length > 10) {
        return <p>too many matches, specify another filter</p>
    }
    if (resultCountries.length === 1) {
        return <Country country={resultCountries[0]} />
    }
    return (
        <div>
            {resultCountries.map(country => (      
                <p key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setSelectedCountry(country)}>show</button>  
                </p>
            ))}
            {selectedCountry && <Country country={selectedCountry} />}  
        </div>
    )
}

const Country = ({ country }) => {   
	
    return (
        <div>
            <h1><b>{country.name.common}</b></h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
        </div>
    )
}

function App() {
	const [searchCountry, setSearchCountry] = useState('');
	const [allCountries, setAllCountries] = useState([]);
	const [resultCountries, setResultCountries] = useState([]);

	useEffect(() => {
		axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => {
				setAllCountries(response.data)
			})
	}, [])
	console.log(allCountries);

	const countryToShow = searchCountry === ''
		? []
		: allCountries.filter(country =>
			country.name.common.toLowerCase().startsWith(searchCountry.toLowerCase())
		)

	const handleOnChangeSearchCountry = (event) => {
		setSearchCountry(event.target.value);
	}

	return (
		<>
			<CountryForm searchCountry={searchCountry} handleOnChangeSearchCountry={handleOnChangeSearchCountry}/>
			<Countries resultCountries={countryToShow} />
		</>
	)
}

export default App
