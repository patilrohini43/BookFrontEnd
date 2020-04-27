import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx'

function App() {
  return (
    <div className="App">
    <Router>
    <Route path=""><NavBar /></Route>
   </Router>
    </div>
  );
}

export default App;
