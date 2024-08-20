import React from 'react';
import Header from './header'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { authenticateUser } from '../services/firebaseAuth.js'

function App() {
  
  return (
    <div className="App">
      <Header />
      <div className="card">
        <h1>Autenticação com Firebase</h1>
        <button onClick={() => {authenticateUser('teste@teste.com','senhateste')}}>Login com senha</button>
        <Footer />
      </div>
    </div>
  )
}

export default App;
