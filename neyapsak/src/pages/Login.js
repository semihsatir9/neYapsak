import { useEffect, useState } from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";

Axios.defaults.withCredentials = true;

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Status, setStatus] = useState("");
    let navigate = useNavigate();

    const loginUser = () => {
        
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then((response) => {
            if(!response.data.message){
                setStatus("Currently logged in as: " + response.data[0].username)
                setTimeout(function() {
                    navigate("/userpage")
                    //navigate to main page here
                  }, 1000);
            }

            else{
                setStatus(response.data.message)
                setTimeout(function() {
                    setStatus("")
                  }, 1000);
            }
            
        });
    };
    

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true){
                setStatus("Currently logged in as: " + response.data.user[0].username)
            }
        })

    }, [])

    return(
            <div className="centered">
                <div className="box">
                <br></br>
                <h2>Login</h2>
                <br></br>
                <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} required/>
                <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} required/>
                <h6>{Status}</h6>
                <button class="button" onClick={
                    loginUser
                    }><span>Login</span></button>
                <br></br><br></br>
                </div>
            </div>

    );
}

export default Login;