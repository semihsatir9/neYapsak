import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Axios } from 'axios';



function App() {

  return (
     <Router>
     <div className='App'>
     <Header />       
     <Routes>
        <Route path="/" exact element={<MainPage/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/register" exact element={<Register/>}/>

     </Routes>
     </div>
     </Router>
  );
  
}



export default App;
