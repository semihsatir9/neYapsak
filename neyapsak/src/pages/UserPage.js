import { useEffect, useState } from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";

Axios.defaults.withCredentials = true;

function UserPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Status, setStatus] = useState("");
    let navigate = useNavigate();

    
    const logout = () => {
        
        Axios.post('http://localhost:3001/logout', {
            username: username,
            password: password
        }).then((response) => {            
        });

        setTimeout(function() {
            navigate("/login")
          }, 1000);

        
        

    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true){
                setStatus("Currently logged in as: " + response.data.user[0].username)
            }
            else{
                navigate("/login")
            }
        })

    }, [])

    return(
        <div>
            <div className="align-left">
                <button className="button" onClick={
                    logout
                    }><span>Logout</span></button>

            </div>
            <div>
                
            </div>

    </div>

    );
}

export default UserPage;