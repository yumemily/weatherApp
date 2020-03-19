import React from 'react'; //import useEffect
import './App.css';


let api = process.env.REACT_APP_APIKEY
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      isLoading: true
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => { this.currentWeather(position.coords.latitude, position.coords.longitude) }, error => { console.log(error) })
  }

  currentWeather = async (lat, lon) => {
    try {
      let url = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`)
      console.log(api)
      let data = await fetch(url)
      let result = await data.json();
      if (result.cod * 1 === 200) {
        console.log(result)
        this.setState(
          {
            weather: result,
            locationName: result.name,
            temperature: result.main.temp,
            description: result.weather[0].description,
            isLoading: false
          })
      }
      else throw new Error(result.message)
    } catch (error) {
      console.log(error)
    }
  }

    componentDidMount() { //similar to useEffect
      this.getLocation();
    }

    render() {
      const { isLoading, locationName, temperature, description } = this.state;
      if (isLoading===true) {
        return (<p>Loading...</p>)
      }
      return (
        <div className="container-fluid text-white my-auto">
          <div className="container mx-auto my-4 py-4">
            <div className="row justify-content-center text-center">
              <h1 className="col-12 display-4 my-2 py-3 text-success">
                Awesome Weather App
              </h1>
              <h2 className="col-12">{locationName}</h2>
              <h3 className="col-12 text-danger">{temperature}°C | {temperature * 1.8 + 32}°F</h3>
              <p className="col-12">{description}</p>
            </div>
          </div>
        </div>
      );
    }

  }



  export default App;
