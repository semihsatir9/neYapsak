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


app.listen(3001, ()=> {
    console.log("Server is running on port 3001!");
});