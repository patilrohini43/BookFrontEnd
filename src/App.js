import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import BookList from './components/BookApp/BookList'
import Test from './components/BookApp/Test'
import SearchBook from './components/SearchBooks/SearchBook';
import SearchBookList from './components/SearchBooks/SearchBookList';
import Footbar from './components/FooterBar/FootBar';
import BookCart from './components/Cart/BookCart';
import Checkout from './components/OrderBook/Checkout';
import OrderPlace from './components/OrderStatus/OrderPlace';
import Login from './components/Login/Login';

function App() {
  
  return (
    <div className="App">
    
    <div style={{minHeight: '100vh'}}>
    <Router>
     <Route path="/book" ><BookList /></Route>
     <Route path="/search"><SearchBook /></Route>
     <Route path="/viewCart" ><BookCart/></Route>
     <Route path="/checkout"><Checkout /></Route>
     <Route path="/orderPlace"><OrderPlace /></Route>
     <Route path="/searchBook"><SearchBookList /></Route> 
     <Route path="/login"><Login /></Route>
     <Route path="/test"><Test /></Route>
   </Router>
      </div>
      <div >
      <Footbar />
      </div>
   
    </div>
  );
}

export default App;
