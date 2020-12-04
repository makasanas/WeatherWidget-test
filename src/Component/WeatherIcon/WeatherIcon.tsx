import React, { FunctionComponent } from 'react';

interface WeatherIconProps {
  icon: string;
  size?: string; //For icon size
}

const WeatherIcon: FunctionComponent<WeatherIconProps> = props => {
  const imgUrl = `http://openweathermap.org/img/wn/${props.icon}${
    props.size ? `@${props.size}` : ``
  }.png`;

  return (
    <div className={'weather-img'}>
      <img src={imgUrl} alt='wthr img' />
    </div>
  );
};

export default WeatherIcon;
