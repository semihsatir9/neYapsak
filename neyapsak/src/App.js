import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
<Router>
                <div className='App'>
                <Header />       
                <Routes>
                    
                    <Route path="/login" exact element={<Login/>}/>
                    <Route path="/register" exact element={<Register/>}/>
                    
                </Routes>
                </div>
                </Router>
  );
  
}

export default App;
