import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import WatchDetail from './components/WatchDetail';
import WatchList from './components/WatchList';
import Cart from './components/Cart';
import Order from './components/Order';
import Profile from './components/Profile';
import VerifyPass from './components/VerifyPass';
import ChangePass from './components/ChangePass';
export default function App() {
  return (
    <BrowserRouter basename="/bskwatchofficial">

      <Routes>
        <Route path="/signin" element={ <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/watch/:watchId" element={<WatchDetail />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/verify" element={<VerifyPass />} />
        <Route path="/account/changepassword" element={<ChangePass />} />
      </Routes>
    </BrowserRouter>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();

