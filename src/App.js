import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import 'dotenv/config'
console.log('++++', process.env)

function App() {

  const [data, setData] = useState([null])

  useEffect(() => {
    const fetchDevice = async () => {
      const apiKey = process.env.REACT_APP_API_KEY
      const applicationKey = process.env.REACT_APP_APPLICATION_KEY
      console.log('test',`https://rt.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`)
      const device = await fetch(`https://rt.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`)
      setData(device.json().then((data) => console.log(data)));
    }
    fetchDevice()
  }, [])
  const dev = data
  console.log(dev)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {Object.keys(dev)}
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
