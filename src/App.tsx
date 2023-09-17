import React from 'react';
import './App.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Disperse } from './containers/Disperse';
import { IntlProvider } from 'react-intl';
import enMessages from './translations/en.json';

function App() {

  return (
    <div className="App">
      <IntlProvider locale='en' messages={enMessages}>
        <Disperse />
      </IntlProvider>
    </div>
  );
}

export default App;
