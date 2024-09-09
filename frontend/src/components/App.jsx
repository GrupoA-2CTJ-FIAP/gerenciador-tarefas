import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home';  // Import your Home component
import Teams from './pages/teams';  // Import your Teams component
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/login'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <Teams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
      </div>
      <Footer />
    </div>
    </Router >
  );
}

export default App;