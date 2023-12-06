import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Principal from './components/Principal';
import Consulta from './components/Consulta';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Principal' element={<Principal />} />
        <Route path='/Consulta' element={<Consulta />} />
      </Routes>
    </Router>
  );
}

export default App;
