import React from 'react';
import { Logo } from './components/Icons';
import Player from './components/Player';

function App() {
  return (
    <div className="container min-h-screen bg-gray-100 dark:bg-gray-700">
      <div className="flex justify-center items-center">
        <h1 className="text-gray-900 dark:text-white text-4xl text-center py-5 mr-2 tracking-in-expand">
          PlayAct
        </h1>
        <div id="logo">
          <Logo />
        </div>
      </div>
      <Player />
    </div>
  );
}

export default App;
