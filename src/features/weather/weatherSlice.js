import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import weatherAPI from '../../api';

const sliceName = 'weather';

export const fetchCurrentWeather = createAsyncThunk(
  `${sliceName}/fetchCurrentWeather`,
  async (query, thunkAPI) => {
    try {
      const response = await weatherAPI.fetchCurrentWeather(query);
      return response;
    } catch (err) {
      const customError = {
        message: err.response.data.message,
        code: err.response.data.cod,
      };
      throw customError;
    }
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

export const weatherSlice = createSlice({
  name: sliceName,
  initialState: {
    current: null,
    loading: false,
    error: null,
    initialLoad: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      state.loading = true;
      state.error = null;
      state.initialLoad = false;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.current = payload.data;
      state.error = null;
      state.initialLoad = false;
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
      state.current = null;
      state.initialLoad = error.code === '400' ? true : false;
    },
  },
});

export const fetchCityWeather = cityName => async dispatch => {
  await dispatch(fetchCurrentWeather(cityName));
};

export const cityWeather = state => state.weather;

export default weatherSlice.reducer;
