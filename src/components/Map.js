import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import io from 'socket.io-client';
import { Button, Container } from '@mui/material';

const socket = io('http://localhost:5000');

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const Map = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/vehicles')
      .then((response) => response.json())
      .then((data) => setVehicles(data));

    socket.on('locationUpdate', (data) => {
      setVehicles((prevVehicles) => {
        const updatedVehicles = [...prevVehicles];
        const vehicleIndex = updatedVehicles.findIndex((v) => v.id === data.id);
        if (vehicleIndex >= 0) {
          updatedVehicles[vehicleIndex] = data;
        } else {
          updatedVehicles.push(data);
        }
        return updatedVehicles;
      });
    });

    return () => {
      socket.off('locationUpdate');
    };
  }, []);

  return (
    <Container>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          {vehicles.map((vehicle) => (
            <Marker key={vehicle.id} position={{ lat: vehicle.lat, lng: vehicle.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
      <Button variant="contained" color="primary">
        My Button
      </Button>
    </Container>
  );
};

export default Map;
