import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import WeatherIcon from './WeatherIcon';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);


describe('WeatherIcon', () => {
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
                <WeatherIcon />
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

})

