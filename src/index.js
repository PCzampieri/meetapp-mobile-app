import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './redux/store';
import App from './App';

import Background from '~/components/Background';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Background>
          <StatusBar barStyle="light-content" backgroundColor="#22202c" />
          <App />
        </Background>
      </PersistGate>
    </Provider>
  );
}
