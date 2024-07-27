

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import Map from './components/Map';

// const App = () => {
//   const [vehicleLocation, setVehicleLocation] = useState({ lat: 0, lng: 0 });

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const response = await axios.get('/api/vehicle-location');
//         setVehicleLocation(response.data);
//       } catch (error) {
//         console.error('Error fetching vehicle location:', error);
//       }
//     };

//     fetchLocation();

//     const socket = io('http://localhost:3001');
//     socket.on('locationUpdate', (location) => {
//       setVehicleLocation(location);
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <div>
//       <h1>Vehicle Tracking App</h1>
//       <Map vehicleLocation={vehicleLocation} />
//     </div>
//   );
// };

// export default App;






import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // This will  check the local storage for the authentication status
    const isLoggedIn = localStorage.getItem('loggedin') === 'true';
    setAuthenticated(isLoggedIn);
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/" element={authenticated ? <h1>Welcome to Vehicle Tracking App</h1> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
