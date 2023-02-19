import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
// import Login from './containers/Login';
// import Register from './containers/Register';

export default function Switch() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home video="https://www.youtube.com/embed/8gSyHLsv8Is" />}
      />
      {/* <PrivateRoute exact path="/" element={Home} /> */}
      {/* <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/home" render={() => <Home />} /> */}
    </Routes>
  );
}
