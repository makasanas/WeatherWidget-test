import React, { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import { cityWeather } from '../../features/weather/weatherSlice';
import WeatherIcon from '../../Component/WeatherIcon/WeatherIcon';
import WeatherItem from '../../Component/WeatherItem/WeatherItem';

import './CityWeather.scss';

interface CityWeatherProps {}

const CityWeather: FunctionComponent<CityWeatherProps> = props => {
  const weather = useSelector(cityWeather);

  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [weatherList, setWeatherList] = useState<any[]>([]);

  useEffect(() => {
    setWeatherData(weather.current);
    if (weather.current) {
      setCurrentWeather(weather.current.list[0]);

      const list = weather.current.list.reduce((r: any, e: any) => {
        const date: any = moment.unix(e.dt).format('L');

        //filter todays info
        if (moment().format('L') === date) {
          return r;
        }

        //filter same day info
        const last: any = r[r.length - 1];
        if (!last) {
          r.push(e);
        } else {
          if (moment.unix(last.dt).format('L') !== date) {
            r.push(e);
          }
        }
        return r;
      }, []);
      setWeatherList(list);
    }
  }, [weather]);

  //Timestamp to 12 hours time formate i.e 5P.M
  const getTime = (time: number) => {
    return moment.unix(time).format('hh:mm A');
  };

  return (
    <div className={'city-weather-details'}>
      {weather.initialLoad ? (
        <p className={'welcome-text'}>
          Welcome to Open Weather, Check your city's atmosphere
        </p>
      ) : (
        <Fragment>
          {weather.loading ? (
            <Fragment>
              <CircularProgress size={28} className='button-progress' />
            </Fragment>
          ) : (
            <Fragment>
              {!weatherData ? (
                <p>City Not Found</p>
              ) : (
                <Fragment>
                  <div className={'city-weather-info'}>
                    <p>{weatherData!.city.name}</p>
                    <div className={'current-weather'}>
                      <div className={'weather-icon'}>
                        <WeatherIcon
                          icon={currentWeather.weather[0].icon}
                          size={'2x'}
                        />
                        <p>{currentWeather.weather[0].description}</p>
                      </div>
                      <h2>
                        {currentWeather!.main.temp}
                        <span>&#8451;</span>
                      </h2>
                      <div className={'sub-info'}>
                        <p>
                          Wind : <span>{currentWeather.wind.speed}</span> m/s
                        </p>
                        <p>
                          Sunrise :{' '}
                          <span>{getTime(weatherData.city.sunrise)}</span>
                        </p>
                        <p>
                          Sunset :
                          <span>{getTime(weatherData.city.sunset)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={'weather-list'}>
                    {weatherList.map((weatherInfo: any, index: number) => (
                      <WeatherItem weatherInfo={weatherInfo} key={index} />
                    ))}
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default CityWeather;
