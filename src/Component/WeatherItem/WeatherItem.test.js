import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import WeatherItem from './WeatherItem';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);


describe('WeatherItem', () => {
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
                <WeatherItem weatherInfo={
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
                    }
                } />
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

})

