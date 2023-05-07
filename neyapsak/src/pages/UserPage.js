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
    const [ing_butter,setIng_butter] = useState("0");
    const [ing_garlic,setIng_garlic] = useState("0");
    const [ing_chicken,setIng_chicken] = useState("0");
    const [ing_milk,setIng_milk] = useState("0");
    const [ing_onion,setIng_onion] = useState("0");
    const [ing_meat,setIng_meat] = useState("0");
    const [ing_carrot,setIng_carrot] = useState("0");
    const [ing_potato,setIng_potato] = useState("0");
    const [ing_bean,setIng_bean] = useState("0");
    const [ing_pasta,setIng_pasta] = useState("0");
    const [ing_cheese,setIng_cheese] = useState("0");
    const [userid,setUserid] = useState("");
    

    let navigate = useNavigate();
    let useridtitle;
    let recipeids = [];
    let ingredients;
    let totalCalories = 0;
    
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

    async function getCaloriesTotal(id) {
        let totalCalories = 0;
        try {
          const response = await Axios.post('http://localhost:3001/getrecipeingredients', {id: id});
          const responsee = await Axios.post("http://localhost:3001/getingredients");
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < responsee.data.length; j++) {
              if(response.data[i].ingredientId == responsee.data[j].ingrId) {
                totalCalories += (responsee.data[j].calories) * (response.data[i].amount);
              }
            }
          }
          totalCalories = parseInt(totalCalories)
          return totalCalories;
        } catch(error) {
          console.error(error);
        }
      }



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
            ing_egg: ing_egg,
            ing_butter: ing_butter,
            ing_garlic: ing_garlic,
            ing_chicken: ing_chicken,
            ing_milk: ing_milk,
            ing_onion: ing_onion,
            ing_carrot: ing_carrot,
            ing_meat: ing_meat,
            ing_potato: ing_potato,
            ing_bean: ing_bean,
            ing_pasta: ing_pasta,
            ing_cheese: ing_cheese
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

    function initializeInventory(userid){
        Axios.post("http://localhost:3001/initialize", {
            userid: userid
        }).then((response) => {
            console.log("User id: " +userid);
            console.log(response);
            setIng_rice(response.data[0].ingrAmount);
            setIng_tomato(response.data[1].ingrAmount);
            setIng_egg(response.data[2].ingrAmount);
            setIng_butter(response.data[3].ingrAmount);
            setIng_garlic(response.data[4].ingrAmount);
            setIng_chicken(response.data[5].ingrAmount);
            setIng_milk(response.data[6].ingrAmount);
            setIng_onion(response.data[7].ingrAmount);
            setIng_carrot(response.data[8].ingrAmount);
            setIng_meat(response.data[9].ingrAmount);
            setIng_potato(response.data[10].ingrAmount);
            setIng_bean(response.data[11].ingrAmount);
            setIng_pasta(response.data[12].ingrAmount);
            setIng_cheese(response.data[13].ingrAmount);
        });
    }
    
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true){
                setUserid(response.data.user[0].userId)
                useridtitle = response.data.user[0].userId
                initializeInventory(response.data.user[0].userId);
                setStatus("Welcome " + response.data.user[0].username + " with ID: " + useridtitle)
                
            }
            else{
                navigate("/login")
            }
        })

        
        
    }, [])

        //This is the start of the whole recipe creation plan
        Axios.post("http://localhost:3001/getrecipeids", {
        }).then((response) => {
            recipeids = []
            for(let i = 0; i < response.data.length; i++){
                recipeids.push(response.data[i].recipeID)
            }
            console.log(recipeids)
            
        });

        async function getcal(){
            const exo = await getCaloriesTotal(1);
            console.log(exo)
        }

        


    



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
                <div className="inlineBlock">
                <input type = "checkbox" id = "hate1" name="hate1" value = "Rice"></input>
                <label for = "hate1">Rice</label>
                <input type = "checkbox" id = "hate2" name="hate2" value = "Rice"></input>
                <label for = "hate2">Rice</label>
                <input type = "checkbox" id = "hate3" name="hate3" value = "Rice"></input>
                <label for = "hate3">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                <input type = "checkbox" id = "hate4" name="hate4" value = "Rice"></input>
                <label for = "hate4">Rice</label>
                </div>
                <br></br><br></br>
                <label>Q4: How much calories can you tolarate? (Calorie calculation is based on the ingredients alone. Calories lost or gained on the cooking process of the meal is not accounted.)</label><br></br><br></br>
                <input type = "int" id = "cal" name="calq"></input>
                <button className="button align-right"><span>Answer</span></button>
                </form>
            </div>

            
            <div className="align-left">
                <h6>User Inventory</h6>
                <div className="ingredientBox"> Rice (Grams)
                <input type="text" name="rice" id="rice" value={ing_rice} onChange={(e) => { setIng_rice(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Tomato (#)
                <input type="text" name="tomato" id="tomato" value={ing_tomato} onChange={(e) => { setIng_tomato(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Egg (#)
                <input type="text" name="egg" id="egg" value={ing_egg} onChange={(e) => { setIng_egg(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Butter (Grams)
                <input type="text" name="butter" id="butter" value={ing_butter} onChange={(e) => { setIng_butter(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Garlic (Clove)
                <input type="text" name="garlic" id="garlic" value={ing_garlic} onChange={(e) => { setIng_garlic(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Chicken (Grams)
                <input type="text" name="chicken" id="chicken" value={ing_chicken} onChange={(e) => { setIng_chicken(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Milk (Mililiters)
                <input type="text" name="milk" id="milk" value={ing_milk} onChange={(e) => { setIng_milk(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Onion (#)
                <input type="text" name="onion" id="onion" value={ing_onion} onChange={(e) => { setIng_onion(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Carrot (#)
                <input type="text" name="carrot" id="carrot" value={ing_carrot} onChange={(e) => { setIng_carrot(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Meat (Grams)
                <input type="text" name="meat" id="meat" value={ing_meat} onChange={(e) => { setIng_meat(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Potato (#)
                <input type="text" name="potato" id="potato" value={ing_potato} onChange={(e) => { setIng_potato(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Bean (Grams)
                <input type="text" name="bean" id="bean" value={ing_bean} onChange={(e) => { setIng_bean(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Pasta (Grams)
                <input type="text" name="pasta" id="pasta" value={ing_pasta} onChange={(e) => { setIng_pasta(e.target.value) }} required/>
                </div>

                <div className="ingredientBox"> Cheese (Grams)
                <input type="text" name="cheese" id="cheese" value={ing_cheese} onChange={(e) => { setIng_cheese(e.target.value) }} required/>
                </div>

                <h2>{inventoryStatus}</h2>

                <button class="button align-right" onClick={
                    updateInventory
                    }><span>Update Inventory</span></button>
                <button class="button align-right" onClick={
                    getcal
                    }><span>testcal</span></button>

                </div>
            

    </div>

    );
}

export default UserPage;