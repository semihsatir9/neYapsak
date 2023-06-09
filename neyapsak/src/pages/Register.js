import { useState } from "react";
import Axios from 'axios';
import {Navigate, useNavigate} from "react-router-dom";
import { Card } from "react-bootstrap";
/* Just a heads up */


Axios.defaults.withCredentials = true;

function Register() {
    
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Status, setStatus] = useState("");
    let navigate = useNavigate();


    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response)
            if(response.data.message){
                setStatus(response.data.message)
                setTimeout(function () {
                    window.location.reload(false);
                  }, 1000);
                
            }
            else{
                setStatus("Successfully Registered") 
                setTimeout(function () {
                    navigate('/login');
                  }, 1000);
                
            }
        });
    };




    return (
        <div className="centered">
        <div className="box">
        <br></br>
        
        <h2>Register</h2>
        <br></br>
        <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} required/>
        <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required/>
        <h4>{Status}</h4>
        <button class="button" onClick = {register}><span>Register as End User</span></button>
        <br></br><br></br>
        </div>
        </div>
    );
};

export default Register;
