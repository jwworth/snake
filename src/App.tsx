import React from 'react';
import './App.css';

import Snake from './Snake';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Snake</p>
        <Snake />
      </header>
    </div>
  );
};

export default App;
