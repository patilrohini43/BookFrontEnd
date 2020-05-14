import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx'
import BookApp from './components/BookApp/BookApp';
import BookList from './components/BookApp/BookList'
import SearchBook from './components/SearchBooks/SearchBook';
import SearchBookList from './components/SearchBooks/SearchBookList';
import Footbar from './components/FooterBar/FootBar';
import BookCart from './components/Cart/BookCart';
import Checkout from './components/OrderBook/Checkout';
import OrderPlace from './components/OrderStatus/OrderPlace';

function App() {

  
  return (
    <div className="App">
      useEffect(() => {
      document.title=`BookStore`
    })
      <div>
        <NavBar />
      </div>
    <Router>
     <Route path="/book"><BookList /></Route>
     <Route path="/search"><SearchBook /></Route>
     <Route path="/viewCart"><BookCart /></Route>
     <Route path="/checkout"><Checkout /></Route>
     <Route path="/orderPlace"><OrderPlace /></Route>
     <Route path="/searchBook"><SearchBookList /></Route>
     
   </Router>
    <div >
      <Footbar />
      </div>
   
    </div>
  );
}

export default App;
