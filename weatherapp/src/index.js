// index.js or App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

import Navbar from './components/Navbar';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router
import Weather from './features/weather/Weather';
import Favorites from './features/favorites/Favorites';
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
