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
    const [userid,setUserid] = useState(0);
    const [supermarketBool, setSupermarketBool] = useState("");
    const [userTime, setUserTime] = useState("");
    const [userDislike, setUserDislike] = useState("");
    const [userCal, setUserCal] = useState("");
    const [rice_dislike, setRice_dislike] = useState(false);
    const [tomato_dislike, setTomato_dislike] = useState(false);
    const [egg_dislike, setEgg_dislike] = useState(false);
    const [butter_dislike, setButter_dislike] = useState(false);
    const [garlic_dislike, setGarlic_dislike] = useState(false);
    const [chicken_dislike, setChicken_dislike] = useState(false);
    const [milk_dislike, setMilk_dislike] = useState(false);
    const [onion_dislike, setOnion_dislike] = useState(false);
    const [carrot_dislike, setCarrot_dislike] = useState(false);
    const [meat_dislike, setMeat_dislike] = useState(false);
    const [potato_dislike, setPotato_dislike] = useState(false);
    const [bean_dislike, setBean_dislike] = useState(false);
    const [pasta_dislike, setPasta_dislike] = useState(false);
    const [cheese_dislike, setCheese_dislike] = useState(false);
    const [allrecipes, setAllRecipes] = useState([]);
    const [recipeids, setRecipeids] = useState([]);



    

    let navigate = useNavigate();
    let useridtitle;
    let ingredients;
    const handleCheck=(data)=>{
        if(data=="rice"){
            if(rice_dislike == true){
                console.log("true rice")
            }
            setRice_dislike(!rice_dislike)
        }
        if(data=="tomato"){
            if(tomato_dislike == true){
                console.log("true tomato")
            }
            setTomato_dislike(!tomato_dislike)
        }
        if(data=="egg"){
            if(egg_dislike == true){
                console.log("true egg")
            }
            setEgg_dislike(!egg_dislike)
        }
        if(data=="butter"){
            if(butter_dislike == true){
                console.log("true butter")
            }
            setButter_dislike(!butter_dislike)
        }
        if(data=="garlic"){
            if(garlic_dislike == true){
                console.log("true garlic")
            }
            setGarlic_dislike(!garlic_dislike)
        }
        if(data=="chicken"){
            if(chicken_dislike == true){
                console.log("true chicken")
            }
            setChicken_dislike(!chicken_dislike)
        }
        if(data=="milk"){
            if(milk_dislike == true){
                console.log("true milk")
            }
            setMilk_dislike(!milk_dislike)
        }
        if(data=="onion"){
            if(onion_dislike == true){
                console.log("true onion")
            }
            setOnion_dislike(!onion_dislike)
        }
        if(data=="carrot"){
            if(carrot_dislike == true){
                console.log("true carrot")
            }
            setCarrot_dislike(!carrot_dislike)
        }
        if(data=="meat"){
            if(meat_dislike == true){
                console.log("true meat")
            }
            setMeat_dislike(!meat_dislike)
        }
        if(data=="potato"){
            if(potato_dislike == true){
                console.log("true potato")
            }
            setPotato_dislike(!potato_dislike)
        }
        if(data=="bean"){
            if(bean_dislike == true){
                console.log("true bean")
            }
            setBean_dislike(!bean_dislike)
        }
        if(data=="pasta"){
            if(pasta_dislike == true){
                console.log("true pasta")
            }
            setPasta_dislike(!pasta_dislike)
        }
        if(data=="cheese"){
            if(cheese_dislike == true){
                console.log("true cheese")
            }
            setCheese_dislike(!cheese_dislike)
        }
        
        
    }
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

    async function getcal(){
        const exo = await getCaloriesTotal(1);
        console.log(exo)
        
            
            
            
        
    }

    async function runAlgorithm(){
        const response = await Axios.post('http://localhost:3001/getrecipeids');
            setRecipeids([])
            for(let i = 0; i < response.data.length; i++){
                recipeids.push({recipeid: response.data[i].recipeID, recipetime: response.data[i].time, score: 0})
            }
            console.log(recipeids)
            console.log(recipeids[0].recipeid)

        

        console.log("Before For loop")
        console.log(recipeids)

        let dislikedarray = []
            if(rice_dislike){
                dislikedarray.push(2);
            }
            if(tomato_dislike){
                dislikedarray.push(4);
            }
            if(egg_dislike){
                dislikedarray.push(5);
            }
            if(butter_dislike){
                dislikedarray.push(6);
            }
            if(garlic_dislike){
                dislikedarray.push(7);
            }
            if(chicken_dislike){
                dislikedarray.push(8);
            }
            if(milk_dislike){
                dislikedarray.push(9);
            }
            if(onion_dislike){
                dislikedarray.push(10);
            }
            if(carrot_dislike){
                dislikedarray.push(11);
            }
            if(meat_dislike){
                dislikedarray.push(12);
            }
            if(potato_dislike){
                dislikedarray.push(13);
            }
            if(bean_dislike){
                dislikedarray.push(14);
            }
            if(pasta_dislike){
                dislikedarray.push(15);
            }
            if(cheese_dislike){
                dislikedarray.push(16);
            }


        for(let i = 0; i < recipeids.length; i++){
            console.log("Entereed For Loop")
            let score = 0;
            console.log("score initialized " + score)
            if(supermarketBool){
                const user = await Axios.post('http://localhost:3001/getrecipeids',{userid: userid, ingrId: recipeids[i].recipeid});
                console.log("user has " + user[0].ingrAmount + " yes")

                //nonscalable so we have to all manually

                
                
            }
            
            //inventory check done
            //problem of time

            score += (userTime - recipeids[i].recipetime) / 2;

            console.log("score after time " + score)

            //time resolved. Score is the evaluation of the difference between
            //the desired time and the recipe time.
            
            //disliking ingredients
            const response = await Axios.post('http://localhost:3001/getrecipeingredients', {id: recipeids[i].recipeid});
            
            
            //disliked ingredient array
            
            console.log(dislikedarray)
            
            for(let i = 0; i < response.data.length; i++) {
                if(dislikedarray.includes(response.data[i].ingredientId)){
                    score -= 150;
                    console.log("dislike food works")
                }
            }

            console.log("score after dislike " + score)

            //disliked food done

            //calorie
            let calorieVal = await getCaloriesTotal(recipeids[i].recipeid)

            score += ((userCal - calorieVal) / 25)
            console.log(calorieVal)

            //calorie done

            console.log("score after calorie final " + score)

            recipeids[i].score = score;
            }

            console.log("end of for loop")
            console.log(recipeids)
            
    
    
    
    
    }
        //Main Lines
        //This is the start of the whole recipe creation plan
        


    return(
        
        <div className = "align-left">
            <h6 className="align-center">{Status}</h6>
            <div className="align-right">
                <button className="button" onClick={
                    logout
                    }><span>Logout</span></button>

        </div>
            <div className="align-left" >
                
                <h6>Optimization</h6>
                <h1></h1> 
                <label>Q1: Do you plan on going to the supermarket?</label><br></br><br></br>
                <input type = "radio" id = "yes" name="supermarketq" value="Yes" onChange={e=>setSupermarketBool(e.target.value)}></input>
                <label for = "yes">Yes</label>
                <br></br>
                <input type = "radio" id = "no" name="supermarketq" value="No" onChange={e=>setSupermarketBool(e.target.value)}></input>
                <label for = "nes">No</label><br></br><br></br>
                <label>Q2: How much time do you have to prepare dinner? (In Minutes)</label><br></br><br></br>
                <input type = "int" id = "time" name="timeq" onChange={e=>setUserTime(e.target.value)}></input><br></br><br></br>
                <label>Q3: What ingredients do you not prefer?</label><br></br><br></br>
                <div className="inlineBlock">
                <input type = "checkbox" id = "dislike1" name="dislike1" value = "Rice" onChange={()=>handleCheck("rice")}></input>
                <label for = "dislike1">Rice</label>
                <input type = "checkbox" id = "dislike2" name="dislike2" value = "Tomato" onChange={()=>handleCheck("tomato")}></input>
                <label for = "dislike2">Tomato</label>
                <input type = "checkbox" id = "dislike3" name="dislike3" value = "Egg" onChange={()=>handleCheck("egg")}></input>
                <label for = "dislike3">Egg</label>
                <input type = "checkbox" id = "dislike4" name="dislike4" value = "Butter" onChange={()=>handleCheck("butter")}></input>
                <label for = "dislike4">Butter</label>
                <input type = "checkbox" id = "dislike5" name="dislike5" value = "Garlic" onChange={()=>handleCheck("garlic")}></input>
                <label for = "dislike5">Garlic</label>
                <input type = "checkbox" id = "dislike6" name="dislike6" value = "Chicken" onChange={()=>handleCheck("chicken")}></input>
                <label for = "dislike">Chicken</label>
                <input type = "checkbox" id = "dislike7" name="dislike7" value = "Milk" onChange={()=>handleCheck("milk")}></input>
                <label for = "dislike7">Milk</label>
                <br></br>
                <input type = "checkbox" id = "dislike8" name="dislike8" value = "Onion" onChange={()=>handleCheck("onion")}></input>
                <label for = "dislike8">Onion</label>
                <input type = "checkbox" id = "dislike9" name="dislike9" value = "Carrot" onChange={()=>handleCheck("carrot")}></input>
                <label for = "dislike9">Carrot</label>
                <input type = "checkbox" id = "dislike10" name="dislike10" value = "Meat" onChange={()=>handleCheck("meat")}></input>
                <label for = "dislike10">Meat</label>
                <input type = "checkbox" id = "dislike11" name="dislike11" value = "Potato" onChange={()=>handleCheck("potato")}></input>
                <label for = "dislike11">Potato</label>
                <input type = "checkbox" id = "dislike12" name="dislike12" value = "Bean" onChange={()=>handleCheck("bean")}></input>
                <label for = "dislike12">Bean</label>
                <input type = "checkbox" id = "dislike13" name="dislike13" value = "Pasta" onChange={()=>handleCheck("pasta")}></input>
                <label for = "dislike12">Pasta</label>
                <input type = "checkbox" id = "dislike14" name="dislike14" value = "Cheese" onChange={()=>handleCheck("cheese")}></input>
                <label for = "dislike12">Cheese</label>
                </div>
                <br></br><br></br>
                <label>Q4: How much calories can you tolarate? (Calorie calculation is based on the ingredients alone. Calories lost or gained on the cooking process of the meal is not accounted.)</label><br></br><br></br>
                <input type = "int" id = "cal" name="calq" onChange = {e=>setUserCal(e.target.value)}></input>
                <button className="button align-right" onClick={
                    runAlgorithm
                    }><span>Answer</span></button>
                
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