import React, { useState } from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import Header from './components/Header';

const App: React.FC = () => {
  
  return(
    <div className= "App">
      <Header/>
      <MainGrid/>
    </div>
  )
}

export default App;
