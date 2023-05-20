const express = require ('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors');


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userId",
    secret: "semihandgörkem",
    resave: false,
    saveUninitialized: false,
    cookie: ({
        expires: 60 * 60 * 24 * 1000,

    })
}))


const db = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    password: '',
    database: 'neyapsakdb',
})


app.post('/register', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    //Query for registering end_users. 
    db.query(
        "SELECT * FROM user WHERE username = ?", [username],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                if (result.length > 0) {
                    res.send({ message: "There exists a user with this username." });
                }


                else if(username != "" && password != "") {
                    db.query('INSERT INTO user (username, password) VALUES (?,?)', [username, password],
                        (err, result) => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send({ message1: "Successfully registered"});
                            }

                        })
                } else{
                    res.send({message: "Cannot Register"})
                }
            }
        }
    )
});

app.get("/login", (req,res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    console.log("Logged Out")

});

app.post('/update_inventory', (req, res) => {
    const ing_rice = req.body.ing_rice;
    const ing_tomato = req.body.ing_tomato;
    const ing_egg = req.body.ing_egg;
    const ing_butter = req.body.ing_butter;
    const ing_garlic = req.body.ing_garlic;
    const ing_chicken = req.body.ing_chicken;
    const ing_milk = req.body.ing_milk;
    const ing_onion = req.body.ing_onion;
    const ing_carrot = req.body.ing_carrot;
    const ing_meat = req.body.ing_meat;
    const ing_potato = req.body.ing_potato;
    const ing_bean = req.body.ing_bean;
    const ing_pasta = req.body.ing_pasta;
    const ing_cheese = req.body.ing_cheese;



    const username = req.body.username;
    const userid = req.body.userid;
    
    db.query(
        "SELECT * FROM user_inventory where userID = ?", [userid],
        (err, result) => {
            if (err) {
                console.log("Error on select user")
                res.send({err: err});
                
            }

            //rice id 2

            db.query(
                "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 2", [userid],
                (err, result) => {
                    if (err || result.length == 0) {
                        db.query(
                            "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,2,?) ", [userid,ing_rice],
                            (err, result) => {
                                if (err) {
                                    res.send({err: err});
                                    console.log("Total failure on rice")  
                                    console.log(err)
                                }else{
                                    console.log("new rice added")
                                }
                                
                            }
                        )   
                    }
                    else{

                        db.query(
                            "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 2", [ing_rice,userid],
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    console.log("Error on updating current rice information.")
                                }
                                else{
                                    console.log("Rice updated") 
                                }
                                  
                                
                         
                            }
                        )


                        
                    }
                      
                    
             
                }
            )
            
            
            

            //tomato id 4

            db.query(
                "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 4", [userid],
                (err, result) => {
                    if (err || result.length == 0) {
                        db.query(
                            "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,4,?) ", [userid,ing_tomato],
                            (err, result) => {
                                if (err) {
                                    res.send({err: err});
                                    console.log("Total failure on tomato")  
                                    console.log(err)
                                }else{
                                    console.log("new tomato added")
                                }
                                
                            }
                        )   
                    }
                    else{

                        db.query(
                            "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 4", [ing_tomato,userid],
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    console.log("Error on updating current tomato information.")
                                }
                                else{
                                    console.log("tomato updated") 
                                }
                                  
                                
                         
                            }
                        )


                        
                    }
                      
                    
             
                }
            )

            //egg id 5

            db.query(
                "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 5", [userid],
                (err, result) => {
                    if (err || result.length == 0) {
                        db.query(
                            "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,5,?) ", [userid,ing_egg],
                            (err, result) => {
                                if (err) {
                                    res.send({err: err});
                                    console.log("Total failure on egg")  
                                    console.log(err)
                                }else{
                                    console.log("new egg added")
                                }
                                
                            }
                        )   
                    }
                    else{

                        db.query(
                            "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 5", [ing_egg,userid],
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    console.log("Error on updating current egg information.")
                                }
                                else{
                                    console.log("egg updated") 
                                }
                                  
                                
                         
                            }
                        )


                        
                    }
                      
                    
             
                }
            )

            //butter id 6

            db.query(
                "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 6", [userid],
                (err, result) => {
                    if (err || result.length == 0) {
                        db.query(
                            "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,6,?) ", [userid,ing_butter],
                            (err, result) => {
                                if (err) {
                                    res.send({err: err});
                                    console.log("Total failure on butter")  
                                    console.log(err)
                                }else{
                                    console.log("new butter added")
                                }
                                
                            }
                        )   
                    }
                    else{

                        db.query(
                            "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 6", [ing_butter,userid],
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    console.log("Error on updating current butter information.")
                                }
                                else{
                                    console.log("butter updated") 
                                }
                                  
                                
                         
                            }
                        )


                        
                    }
                      
                    
             
                }
            )

            //garlic id 7

            db.query(
                "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 7", [userid],
                (err, result) => {
                    if (err || result.length == 0) {
                        db.query(
                            "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,7,?) ", [userid,ing_garlic],
                            (err, result) => {
                                if (err) {
                                    res.send({err: err});
                                    console.log("Total failure on garlic")  
                                    console.log(err)
                                }else{
                                    console.log("new garlic added")
                                }
                                
                            }
                        )   
                    }
                    else{

                        db.query(
                            "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 7", [ing_garlic,userid],
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    console.log("Error on updating current garlic information.")
                                }
                                else{
                                    console.log("garlic updated") 
                                }
                                  
                                
                         
                            }
                        )

                        //chicken id 8

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 8", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,8,?) ", [userid,ing_chicken],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on chicken")  
                                                console.log(err)
                                            }else{
                                                console.log("new chicken added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 8", [ing_chicken,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current chicken information.")
                                            }
                                            else{
                                                console.log("chicken updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //milk id 9

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 9", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,9,?) ", [userid,ing_milk],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on milk")  
                                                console.log(err)
                                            }else{
                                                console.log("new milk added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 9", [ing_milk,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current milk information.")
                                            }
                                            else{
                                                console.log("milk updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //onion id 10

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 10", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,10,?) ", [userid,ing_onion],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on onion")  
                                                console.log(err)
                                            }else{
                                                console.log("new onion added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 10", [ing_onion,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current onion information.")
                                            }
                                            else{
                                                console.log("onion updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //carrot id 11

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 11", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,11,?) ", [userid,ing_carrot],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on carrot")  
                                                console.log(err)
                                            }else{
                                                console.log("new carrot added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 11", [ing_carrot,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current carrot information.")
                                            }
                                            else{
                                                console.log("carrot updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //meat id 12

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 12", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,12,?) ", [userid,ing_meat],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on meat")  
                                                console.log(err)
                                            }else{
                                                console.log("new meat added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 12", [ing_meat,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current meat information.")
                                            }
                                            else{
                                                console.log("meat updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //potato id 13

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 13", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,13,?) ", [userid,ing_potato],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on potato")  
                                                console.log(err)
                                            }else{
                                                console.log("new potato added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 13", [ing_potato,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current potato information.")
                                            }
                                            else{
                                                console.log("potato updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //bean id 14

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 14", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,14,?) ", [userid,ing_bean],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on bean")  
                                                console.log(err)
                                            }else{
                                                console.log("new bean added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 14", [ing_bean,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current bean information.")
                                            }
                                            else{
                                                console.log("bean updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //pasta id 15

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 15", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,15,?) ", [userid,ing_pasta],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on pasta")  
                                                console.log(err)
                                            }else{
                                                console.log("new pasta added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 15", [ing_pasta,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current pasta information.")
                                            }
                                            else{
                                                console.log("pasta updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )

                        //cheese id 16

                        db.query(
                            "SELECT * FROM user_inventory WHERE userId = ? and ingrId = 16", [userid],
                            (err, result) => {
                                if (err || result.length == 0) {
                                    db.query(
                                        "INSERT INTO user_inventory (userId, ingrId, ingrAmount) VALUES (?,16,?) ", [userid,ing_cheese],
                                        (err, result) => {
                                            if (err) {
                                                res.send({err: err});
                                                console.log("Total failure on cheese")  
                                                console.log(err)
                                            }else{
                                                console.log("new cheese added")
                                            }
                                            
                                        }
                                    )   
                                }
                                else{
            
                                    db.query(
                                        "UPDATE user_inventory SET ingrAmount = ? WHERE userId = ? and ingrId = 16", [ing_cheese,userid],
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                console.log("Error on updating current cheese information.")
                                            }
                                            else{
                                                console.log("cheese updated") 
                                            }
                                              
                                            
                                     
                                        }
                                    )
            
            
                                    
                                }
                                  
                                
                         
                            }
                        )


                        
                    }
                      
                    
             
                }
            )


  
        }
    )   

});

    //end of update inventory
    
    app.post('/getfromrecipe', (req, res) => {
        console.log(req.body);
        const recipeid = req.body.recipeid;
        db.query(
            "SELECT * FROM recipe_ingredient where recipeId = ?", [recipeid],
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                else{
                    res.send(result)
                }
            }
        )
    });

    app.post('/getuserinventory', (req, res) => {
        console.log(req.body);
        const userid = req.body.userid;
        db.query(
            "SELECT * FROM user_inventory where userId = ?", [userid],
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                else{
                    res.send(result)
                }
            }
        )
    });

    app.post('/getrecipeids', (req, res) => {
        console.log(req.body);
        db.query(
            "SELECT * FROM recipe",
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                else{
                    res.send(result)
                }
            }
        )
    });

    app.post('/getingredients', (req, res) => {
        console.log(req.body);
        db.query(
            "SELECT * FROM ingredient",
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                else{
                    res.send(result)
                }
            }
        )
    });

    app.post('/getrecipeingredients', (req, res) => {
        const id = req.body.id
        db.query(
            "SELECT * FROM recipe_ingredient WHERE recipeID = ?",[id],
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                else{
                    res.send(result)
                }
            }
        )
    });

    app.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;



    //Query for logging users.
    db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if(result.length > 0 ){
                req.session.user = result;
                console.log(req.session.user)
                res.send(result);
            }
            else{
                res.send({message: "Wrong username or password combination."})

            }
            
        }
    )

});
    
app.post('/initialize', (req, res) => {
        console.log(req.body);
        const sql = "Select * from user_inventory where userId = ?"
        const userid = req.body.userid;

        //Query for intializing inventory.
        db.query(
            sql, [userid],
            (err, result) => {
                if(err) {
                    res.send({err: err});
                } else {
                    console.log(result);
                    res.send(result);
                }


                
            }
        )

    });

app.listen(3001, ()=> {
    console.log("Server is running on port 3001!");
});