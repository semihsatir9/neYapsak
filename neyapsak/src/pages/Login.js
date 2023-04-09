import { useState } from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";

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
            if(response.data.message1){
                setStatus(response.data.message1);
                setTimeout(function() {
                    navigate("/profileenduser/" + username.toString())
                  }, 1000);
                  /*loginBoolean = true;*/
                
            }
            else if(response.data.message2){
                setStatus(response.data.message2);
                
                
            }else if(response.data.message4){
                setStatus(response.data.message4);
                setTimeout(function() {
                    navigate("/profilecompany/" + username.toString())
                    
                  }, 1000);
                
            } else{
                setStatus("Cannot Login");
                console.log(response.err);
            }  
        });
    };

    return(
            <div className="centered">
                <div className="box">
                <br></br>
                <h2>Login</h2>
                <br></br>
                <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <h6>{Status}</h6>
                <a href="/resetpassword">
                    <div className="forgotPassword">Forgot password?</div>
                </a>
                <br></br><br></br>
                <button class="button" onClick={
                    loginUser
                    }><span>Login</span></button>
                <br></br><br></br>
                </div>
            </div>

    );
}

export default Login;