import React from 'react';
import { Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { myCustomTheme } from './customTheme';
import Home from './views/Home';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={myCustomTheme}>
      <CssBaseline />
      <div className="App">
        <Route exact path="/" render={() => <Home />} />
      </div>
    </ThemeProvider>
  );
}

export default App;
