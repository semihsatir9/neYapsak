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
                setStatus("Welcome " + response.data.user[0].username)
            }
            else{
                navigate("/login")
            }
        })

    }, [])

    return(
        
        <div className = "align-left">
            <h6 className="align-center">{Status}</h6>
            <div className="align-right ingredientBox">
                <button className="button" onClick={
                    logout
                    }><span>Logout</span></button>

        </div>
            <div className="align-left">
                <form>
                <h6>Optimization</h6>
                <label>Q1: Do you plan on going to the supermarket?</label><br></br><br></br>
                <input type = "radio" id = "yes" name="supermarketq" value="Yes"></input>
                <label for = "yes">Yes</label>
                <br></br>
                <input type = "radio" id = "no" name="supermarketq" value="No"></input>
                <label for = "nes">No</label><br></br><br></br>
                <label>Q2: How much time do you have to prepare dinner? (In Minutes)</label><br></br><br></br>
                <input type = "int" id = "time" name="timeq"></input><br></br><br></br>
                <label>Q3: What ingredients do you hate?</label><br></br><br></br>
                <input type = "string" id = "hate" name="hateq"></input><br></br><br></br>
                <label>Q4: How much calories can you tolarate? (Calorie calculation is based on the ingredients alone. Calories lost or gained on the cooking process of the meal is not accounted.)</label><br></br><br></br>
                <input type = "int" id = "cal" name="calq"></input><br></br><br></br>
                <button className="button align-right"><span>Answer</span></button>
                </form>
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