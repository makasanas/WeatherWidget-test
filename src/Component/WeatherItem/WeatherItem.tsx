import React, { FunctionComponent } from 'react';
import moment from 'moment';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

import './WeatherItem.scss';

interface WeatherItemProps {
  weatherInfo: any;
}

const WeatherItem: FunctionComponent<WeatherItemProps> = props => {
  //Timestamp to date format i.e Wed
  const getDay = (time: number) => {
    return moment.unix(time).format('ddd');
  };

  return (
    <div className={'weather-item'}>
      <p>{getDay(props.weatherInfo.dt)}</p>
      <WeatherIcon icon={props.weatherInfo.weather[0].icon} />
      <p>
        {' '}
        {props.weatherInfo.main.temp}
        <span>&#8451;</span>
      </p>
    </div>
  );
};

export default WeatherItem;
