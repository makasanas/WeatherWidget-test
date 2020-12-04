import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';

import {
  fetchCityWeather,
  cityWeather,
} from '../../features/weather/weatherSlice';

import './SearchBox.scss';

interface SearchBoxProps { }

const SearchBox: FunctionComponent<SearchBoxProps> = props => {
  const dispatch = useDispatch();
  const weather = useSelector(cityWeather);

  const [searchText, setSearchText] = useState<string>('');

  return (
    <div className={'search-box'}>
      <input
        className={'search-field'}
        data-testid={"search-box"}
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value)
        }}
      />
      <div className='button-wrapper'>
        <Button
          disabled={weather.loading}
          onClick={() => dispatch(fetchCityWeather(searchText))}
          data-testid={"search-box-button"}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
