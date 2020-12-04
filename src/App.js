import React from 'react';
import logo from './logo.svg';
import SearchBox from './Component/SearchBox/SearchBox';
import CityWeather from './features/weather/CityWeather';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <div className={'container'}>
        <div className='logo'>
          <img src={logo} alt='logo' height='100' />
        </div>
        <SearchBox />
        <CityWeather />
      </div>
    </div>
  );
}

export default App;
