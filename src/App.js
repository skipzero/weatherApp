import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useFetch from './usefetch';
// import 'dotenv/config'

function App() {

  const [deviceData, setDeviceData] = useState({})

  const apiKey = process.env.REACT_APP_API_KEY
  const applicationKey = process.env.REACT_APP_APPLICATION_KEY
  const url = `https://rt.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`
  
  const {loading, data, error} = useFetch(url)
  
  console.log(data)
  // useEffect(() => {
    
  //   const fetchDevice = async () => {
  //     const apiKey = process.env.REACT_APP_API_KEY
  //     const applicationKey = process.env.REACT_APP_APPLICATION_KEY
      
  //     const device = await fetch(`https://rt.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`)
  //       .then(data => setData(data))
  //       .then(console.log(data => '---------', data))

  //     return device;
  //   }
  //   fetchDevice()
  // },[])
  // console.log('---------dev------', data)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
