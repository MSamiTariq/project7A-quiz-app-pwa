import React from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import Header from './components/Header';
import firebase from './firebase'

const App: React.FC = () => {
  const messaging = firebase.messaging();
  Notification.requestPermission().then((permission) => {
    if(permission === 'granted'){
      return messaging.getToken();
    }
  }).then((token: any) => {
    console.log(token);
  })
  return(
    <div className= "App">
      <Header/>
      <MainGrid/>
    </div>
  )
}

export default App;
