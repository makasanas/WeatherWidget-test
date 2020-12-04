import React from 'react';
import { waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchBox from './SearchBox';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
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

        getByTestId('search-box').dispatchEvent(
            new MouseEvent('onChange', { target: { value: 'search-text' } })
        );


        await waitFor(() => {
            expect(getByTestId('search-box')).toStrictEqual('search-text')
        })
    });
})

