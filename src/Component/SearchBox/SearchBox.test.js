import React from 'react';
import { fireEvent, waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchBox from './SearchBox';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import axios from 'axios';

const mockStore = configureMockStore([thunk]);

const fetchWealtherURL = (text) => `https://api.openweathermap.org/data/2.5/forecast?q=${text}&units=metric&appid=567fb009055f8d8fddf69948130c088f`
jest.mock('axios');
const responseMock = {
    "cod": "200",
    "message": 0.0032,
    "cnt": 36,
    "list": [
        {
            "dt": 1487246400,
            "main": {
                "temp": 286.67,
                "temp_min": 281.556,
                "temp_max": 286.67,
                "pressure": 972.73,
                "sea_level": 1046.46,
                "grnd_level": 972.73,
                "humidity": 75,
                "temp_kf": 5.11
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.81,
                "deg": 247.501
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2017-02-16 12:00:00"
        },

    ],
    "city": {
        "id": 6940463,
        "name": "Altstadt",
        "coord": {
            "lat": 48.137,
            "lon": 11.5752
        },
        "country": "none"
    }
}

describe('SearchBox', () => {
    test('should render app.js', () => {
        const store = mockStore({
            weather: {
                current: null,
                loading: false,
                error: null,
                initialLoad: true,
            }
        });
        const tree = render(
            <Provider store={store}>
                <SearchBox />
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });
    test('should render text when user type into search box', async () => {
        const store = mockStore({
            weather: {
                current: null,
                loading: false,
                error: null,
                initialLoad: true,
            }
        });
        const origDispatch = store.dispatch
        store.dispatch = jest.fn(origDispatch)
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchBox />
            </Provider>
        );

        fireEvent.change(
            getByTestId('search-box'),
            { target: { value: 'search-text' } }
        )
        expect(getByTestId('search-box').value).toStrictEqual('search-text')
    });
    test('should call fetchCurrentWeather api with enteres city by user', async () => {
        axios.get.mockResolvedValueOnce(responseMock)
        const store = mockStore({
            weather: {
                current: null,
                loading: false,
                error: null,
                initialLoad: true,
            }
        });
        const origDispatch = store.dispatch
        store.dispatch = jest.fn(origDispatch)
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchBox />
            </Provider>
        );
        fireEvent.change(
            getByTestId('search-box'),
            { target: { value: 'search-text' } }
        )
        await waitFor(() => {
            fireEvent.click(
                getByTestId('search-box-button')
            )
        })
        expect(axios.get).toHaveBeenCalledWith(fetchWealtherURL('search-text'))
    });
})

