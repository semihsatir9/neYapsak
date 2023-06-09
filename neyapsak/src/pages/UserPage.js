import { useEffect, useState } from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { Checkbox } from "@material-ui/core";

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
    const [supermarketBool, setSupermarketBool] = useState(false);
    const [userTime, setUserTime] = useState(0);
    const [userDislike, setUserDislike] = useState("");
    const [userCal, setUserCal] = useState(0);
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
    const [cooktime, setCookTime] = useState([]);
    const [recipecalorie, setRecipeCalorie] = useState([]);
    const [recipestate, setRecipeState] = useState([])
    const [bestcase, setBestCase] = useState([])
    const [bestcasedesc, setBestCaseDesc] = useState([])    
    const [resultDiv, setResultDiv] = useState(true)  
    const [arrInd, setArrInd] = useState(0)
    const [ingredientlist, setIngredientList] = useState("");

    

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
        if(data == false){
            console.log("True")
            setSupermarketBool(!supermarketBool)
        }
        if(data == true){
            console.log("False")
            setSupermarketBool(!supermarketBool)
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
          const response = await Axios.post('http://localhost:3001/getrecipeingredients', {recipeid: id});
          const responsee = await Axios.post("http://localhost:3001/getingredients");
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < responsee.data.length; j++) {
              if(response.data[i].ingredientId == responsee.data[j].ingrId) {
                totalCalories += (responsee.data[j].calories) * (response.data[i].amount);
              }
            }
          }
          
          return totalCalories;
        } catch(error) {
          console.error(error);
        }
      }



    function updateInventory(){

        if(ing_rice == "" || ing_tomato == "" || ing_egg == "" || ing_butter == "" || ing_garlic == "" || ing_chicken == "" || ing_milk == "" || ing_onion == "" || ing_carrot == "" || ing_meat == "" || ing_potato == "" || ing_bean == "" || ing_pasta == "" || ing_cheese == ""){
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

    function arrayPass(arrInd){
        if(arrInd == 2){
            setArrInd(2)
        } else {
            setArrInd(arrInd+1)
        }

    }

    function arrayPrev(arrInd){
        if(arrInd == 0){
            setArrInd(0)
        } else {
            setArrInd(arrInd-1)
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
        setArrInd(0)
        const response = await Axios.post('http://localhost:3001/getrecipeids');
            setRecipeids([])
            for(let i = 0; i < response.data.length; i++){
                recipeids.push({recipeName:response.data[i].recipeName ,recipeid: response.data[i].recipeID, recipetime: response.data[i].time, recipedesc : response.data[i].recipeDesc, score: 0, recipecal: 0, state: ""})
            }
            console.log(recipeids)

        

            console.log("1. Before For loop")
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


            //the main for loop where all the magic happens
            
        for(let i = 0; i < recipeids.length; i++){
            console.log("2. Entereed For Loop")
            let score = 0;
            console.log("3. score initialized " + score)
            if(supermarketBool == true){
                const recipeingredient = await Axios.post('http://localhost:3001/getrecipeingredients', {recipeid: recipeids[i].recipeid});
                const userinventory = await Axios.post('http://localhost:3001/getuserinventory', {userid: userid});
                console.log("4. Recipe ingredients gathered")

                //check all ingredients manually

                for(let j = 0; j < recipeingredient.data.length; j++){
                    for(let k = 0; k < userinventory.data.length; k++){
                        if(recipeingredient.data[j].ingredientId == userinventory.data[k].ingrId){
                            if(userinventory.data[k].ingrAmount < recipeingredient.data[j].amount){
                                score -= 150;
                                console.log("Penalty applied due to insufficient amount of ingredients")
                            }
                        }
                    }
                }

                
                
            }
            
            //inventory check done
            //problem of time

                
            //userTime == recipeids[i].recipetime, score = 100
            //userTime > recipeids[i].recipetime, score < 100
            //userTime < recipeids[i].recipetime, score = -100

                if(userTime == recipeids[i].recipetime){
                    score += 50
                } else if(userTime > recipeids[i].recipetime){
                    score += 50 - (userTime - recipeids[i].recipetime)
                } else {
                    score -= 50
                }

            console.log("5. score after time " + score)

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

            console.log("6. score after dislike " + score)

            //disliked food done

            //get total calories
            let calorieVal = await getCaloriesTotal(recipeids[i].recipeid)


            if(userCal == calorieVal){
                score += 50
            } else if(userCal > calorieVal){
                score += 50 - ((userCal - calorieVal)/20)
            } else {
                score -= 50
            }

            console.log(calorieVal)
            recipeids[i].recipecal = calorieVal;

            //calorie done

            console.log("7. score after calorie final " + score)

            recipeids[i].score = score;
        }

            console.log("8. end of for loop")

            //sorting algorithm here

            for(let i = 0; i < recipeids.length; i++){

                for(let j = 0; j < recipeids.length - i - 1; j++){

                    if(recipeids[j + 1].score >= recipeids[j].score){
                        //Swapping
                        [recipeids[j + 1],recipeids[j]] = [recipeids[j],recipeids[j + 1]]
                    }
                }
            };

            //if the score is very low, keep the user informed about the unoptimal 
            for(let i = 0; i < recipeids.length; i++){
                if(recipeids[i].score <= -10){
                    recipeids[i].state = "The algorithm has deemed this recipe to be too unoptimal!"
                } else {
                    recipeids[i].state = ""
                }
            }

            
            console.log(recipeids)
            setCookTime([recipeids[0].recipetime, recipeids[1].recipetime, recipeids[2].recipetime, "0"])
            setRecipeCalorie([recipeids[0].recipecal, recipeids[1].recipecal, recipeids[2].recipecal, "0"])
            setRecipeState([recipeids[0].state,recipeids[1].state,recipeids[2].state, ""])
            setBestCase([recipeids[0].recipeName,recipeids[1].recipeName,recipeids[2].recipeName])
            //recipe ingredient list array here. With the function

            const ingrresponse = await Axios.post('http://localhost:3001/getrecipeingredients', {recipeid: recipeids[0].recipeid});
            const ingrresponse2 = await Axios.post('http://localhost:3001/getrecipeingredients', {recipeid: recipeids[1].recipeid});
            const ingrresponse3 = await Axios.post('http://localhost:3001/getrecipeingredients', {recipeid: recipeids[2].recipeid});
            setIngredientList([getIngredientList(ingrresponse),getIngredientList(ingrresponse2),getIngredientList(ingrresponse3)])
            setBestCaseDesc([recipeids[0].recipedesc,recipeids[1].recipedesc,recipeids[2].recipedesc, "No description"])
            setResultDiv(false)
    
    
    
    }
    
    const changeBoolean = e =>{
        setSupermarketBool(e.target.value)
        console.log(supermarketBool)
    }

    const getIngredientList = (recipeingredients) => {
        let ingredientlist = "";
        for(let i = 0; i < recipeingredients.data.length; i++){
            if(recipeingredients.data[i].ingrName === "rice"  || recipeingredients.data[i].ingrName === "butter" || recipeingredients.data[i].ingrName === "chicken" || recipeingredients.data[i].ingrName === "meat" || recipeingredients.data[i].ingrName === "bean" || recipeingredients.data[i].ingrName === "pasta" || recipeingredients.data[i].ingrName === "cheese"){
            ingredientlist += recipeingredients.data[i].amount + " grams of " + recipeingredients.data[i].ingrName + "\n"
            }
            else if(recipeingredients.data[i].ingrName === "milk"){
            ingredientlist += recipeingredients.data[i].amount + " mililiters of " + recipeingredients.data[i].ingrName + "\n"
            }
            else if(recipeingredients.data[i].ingrName === "garlic"){
            ingredientlist += recipeingredients.data[i].amount + " cloves of " + recipeingredients.data[i].ingrName + "\n"
            }
            else{
            ingredientlist += recipeingredients.data[i].amount + " whole " + recipeingredients.data[i].ingrName + "(s) \n"
            }
        }
        console.log(ingredientlist)
        return ingredientlist
    }
        //Main Lines
        
        


    return(
        
        <div className = "align-left">
            <h6 className="align-center">{Status}</h6>
            <div className="align-right">
                <button className="button" onClick={
                    logout
                    }><span>Logout</span></button>

        </div>
            <div className="align-left" >
                
                <h6>Questions</h6>
                <h1></h1> 
                <label>Q1: Will you include your inventory to your preferences? (If selected, you will be presented with recipes that you have the ingredients for)</label>
                <input type = "checkbox" id = "supermarket" name="supermarket"  onChange={()=>handleCheck(supermarketBool)}></input><br></br><br></br>
                <label>Q2: How much time do you have to prepare dinner? (In Minutes. Average recipe time is 25 minutes, while the maximum recipe time is 45 minutes.)</label><br></br><br></br>
                <input type = "int" id = "time" name="timeq" min = "1" max = "45" onChange={e=>setUserTime(e.target.value)}></input><br></br><br></br>
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
                <input type = "checkbox" id = "dislike15" name="dislike15" value = "Brocolli" checked onChange={()=>handleCheck("brocolli")}></input>
                <label for = "dislike15">Brocolli</label>
                </div>
                <br></br><br></br>
                <label>Q4: How much calories can you tolarate? (Calorie calculation is based on the ingredients alone. Calories lost or gained on the cooking process of the meal is not accounted. Average calories for general recipes is around 1500-2000)</label><br></br><br></br>
                <input type = "int" id = "cal" name="calq" onChange = {e=>setUserCal(e.target.value)}></input>
                <button className="button align-right" onClick={
                    runAlgorithm
                    }><span>Answer</span></button>
                
            </div>
            <br></br><br></br>
            <div className="align-left" hidden={resultDiv}>
                <h3>The best possible recipes for you are: </h3>
                <h3>1. {bestcase[0]}</h3>
                <h3>2. {bestcase[1]}</h3>
                <h3>3. {bestcase[2]}</h3>
                <br></br>
                <h3 className="colorRed">{recipestate[arrInd]}</h3>
                <h3>{bestcase[arrInd]}</h3>
                <h3>Cook Time: {cooktime[arrInd]} minutes</h3>
                <h3>Calories: {recipecalorie[arrInd]} kcal</h3>
                <h3 className="display-linebreak">{ingredientlist[arrInd]}</h3>
                <h3>{bestcasedesc[arrInd]}</h3>
                <br></br>

                <button className="button" onClick={() =>
                    arrayPrev(arrInd)
                }
                    ><span>Previous Recipe</span></button>

                <button className="button" onClick={() =>
                    arrayPass(arrInd)
                }
                    ><span>Next Recipe</span></button>

            </div>

            
            <div className="align-left">
                <h6>User Inventory (Simple ingredients like salt, water, sunflower oil etc. are not included and will be asked in the recipe)</h6>
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

                </div>
            

    </div>

    );
}

export default UserPage;