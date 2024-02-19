import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "./store/store";
import App from './App';

test('renders main page', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // expect(screen.getByText(/get the price/i)).toBeInTheDocument();


  // expect(screen.getByText(/get the price/i)).toBeInTheDocument();

});
