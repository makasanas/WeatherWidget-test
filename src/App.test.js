import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';


describe('App', () => {
  test('should render app.js', () => {

    const tree = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
})

