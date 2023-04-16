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
            <div className="align-left">
                <h6>User Inventory</h6>
                
                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <div className="ingredientBox"> Rice
                <input type="text" name="rice" id="rice" onChange={(e) => {}} required/>
                </div>

                <button class="button align-right" onClick={
                    console.log("")
                    }><span>Update Inventory</span></button>

                

            </div>

    </div>

    );
}

export default UserPage;