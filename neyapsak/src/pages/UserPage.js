import { useEffect, useState } from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";

Axios.defaults.withCredentials = true;

function UserPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inventoryStatus, setInventoryStatus] = useState("");
    const [Status, setStatus] = useState("");
    const [ing_rice,setIng_rice] = useState("0");
    const [ing_tomato,setIng_tomato] = useState("0");
    const [ing_egg,setIng_egg] = useState("0");
    const [userid,setUserid] = useState("");

    let navigate = useNavigate();
    let useridtitle;


    

    
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


    function updateInventory(){

        if(ing_egg == "" || ing_tomato == "" || ing_rice == ""){
            setInventoryStatus("Fill all the ingredient data.")
            setTimeout(function() {
                setInventoryStatus("")
              }, 1000);



        }
        else{

        Axios.post('http://localhost:3001/update_inventory', {
            username: username,
            userid: userid,
            ing_rice: ing_rice,
            ing_tomato: ing_tomato,
            ing_egg: ing_egg
        }).then((response) => {
            //Will update the inventory. Response is the table that is filled with the
            //updated values

            
        });
        setInventoryStatus("Data updated.")

            setTimeout(function() {
                setInventoryStatus("")
              }, 1000);


        
    }


    }

    function initializeInventory(){
        Axios.post("http://localhost:3001/initialize", {
            userId: userid
        }).then((response) => {
            setIng_rice(response.data[0].ingrAmount);
            setIng_tomato(response.data[1].ingrAmount);
            setIng_egg(response.data[2].ingrAmount);
        });
    }
    
    useEffect(() => {
        
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true){
                setUserid(response.data.user[0].userId)
                useridtitle = response.data.user[0].userId
                setStatus("Welcome " + response.data.user[0].username + " with ID: " + useridtitle)
                
                
            }
            else{
                navigate("/login")
            }
        })

        initializeInventory();
        
    }, [])

    
    
    return(
        
        <div className = "align-left">
            <h6 className="align-center">{Status}</h6>
            <div className="align-right">
                <button className="button" onClick={
                    logout
                    }><span>Logout</span></button>

        </div>
            <div className="align-left" >
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
                <input type = "checkbox" id = "hate1" name="hate1" value = "Rice"></input>
                <label for = "hate1">Rice</label><br></br>
                <input type = "checkbox" id = "hate2" name="hate2" value = "Rice"></input>
                <label for = "hate2">Rice</label><br></br>
                <input type = "checkbox" id = "hate3" name="hate3" value = "Rice"></input>
                <label for = "hate3">Rice</label><br></br>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label><br></br>
                <br></br><br></br>
                <label>Q4: How much calories can you tolarate? (Calorie calculation is based on the ingredients alone. Calories lost or gained on the cooking process of the meal is not accounted.)</label><br></br><br></br>
                <input type = "int" id = "cal" name="calq"></input><br></br><br></br>
                <button className="button align-right"><span>Answer</span></button>
                </form>
            </div>

            
            <div className="align-left">
                <h6>User Inventory</h6>
                <div className="ingredientBox"> Rice (Grams)
                <input type="text" name="rice" id="rice" value={ing_rice} onChange={(e) => { setIng_rice(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Tomato (Piece)
                <input type="text" name="tomato" id="tomato" value={ing_tomato} onChange={(e) => { setIng_tomato(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Egg (Piece)
                <input type="text" name="egg" id="egg" value={ing_egg} onChange={(e) => { setIng_egg(e.target.value) }} required/>
                </div>

                <h2>{inventoryStatus}</h2>

                <button class="button align-right" onClick={
                    updateInventory
                    }><span>Update Inventory</span></button>

                </div>
            

    </div>

    );
}

export default UserPage;