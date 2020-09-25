import React, { useState } from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import Header from './components/Header';
import UserData from './components/UserData';

const App: React.FC = () => {
  
  return(
    <div>
      <Header/>
      <UserData/>
    </div>
  )
}

export default App;
