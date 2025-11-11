import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';


const Home = () => (
  <div className='center-content text-center container'>
    <div className='p-5 bg-white bg-opacity-10 rounded-3 shadow-lg'>
      <h1 className='display-4 text-white fw-bold'>Welcome to Account Manager</h1>
      <p className='lead text-info'>Login,Register or manage your account</p>
      <hr className='my-4 text-white'/>
      <p className='text-white-50'>Click "Login" or "Register" to get started.</p>
    </div>
  </div>
);

function App() {

  return (
   <AuthProvider>
    <BrowserRouter>
      <Navbar/>
      <div className='container-fluid p-0'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </div>
    </BrowserRouter>
   </AuthProvider>
  );
};

export default App;
