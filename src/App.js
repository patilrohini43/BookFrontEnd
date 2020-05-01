import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx'
import BookApp from './components/BookApp/BookApp';
import BookList from './components/BookApp/BookList'
import SearchBook from './components/SearchBooks/SearchBook';

function App() {

  const [valueData,setValueData]=useState([])
  const [serachValue,setSearchValue]=useState('')

  const demo = (value) =>{
    setValueData(value)
    setSearchValue(true)
    console.log(valueData+"app value")

    console.log("hiii")
  }
  return (
    <div className="App">
      <div>
        <NavBar demo={demo} />
      </div>
    <Router>
     <Route path="/book"><BookList  valueData={valueData}  serachValue={serachValue} /></Route>
     {/* <Route path="/Search"><SearchBook /></Route> */}
   </Router>
    </div>
  );
}

export default App;
