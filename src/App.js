import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx'
import BookApp from './components/BookApp/BookApp';

function App() {
  return (
    <div className="App">
    <Router>
    <Route path=""><NavBar /></Route>
    <Route path="bookPage"><BookApp /></Route>
   </Router>
    </div>
  );
}

export default App;
