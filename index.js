// // ! here generate token function will not be used insted jasonwebtoken libriary will be imported

// const express = require('express')
// const body=require('body-parser')
// const app = express()
// const jwt=require('jsonwebtoken');

// app.use(express.json());

// const JWT_SECRET="hello_ahemdabad"; 
// const users=[];

// // ? here we are returning frontend form backend itself when we hit localhost:3000/

// // !!! dont foget to change it
// app.get('/', (req, res) => {
// res.sendFile(__dirname + '/public/signup.html');
// });

// app.get('/signin', (req, res) => {
// res.sendFile(__dirname + '/public/signin.html');
// });

// //?__dirname is the directory name of the current module. This is the same as the path.ie C:\Users\gosai\OneDrive\cohort\backend\week6--lec2-assignment
// // !!!

// app.post('/signup', (req, res) =>{
//     const username=req.body.username;
//     const password= req.body.password;    

//     const fullname=req.body.fullname;     

//     users.push({
//         username:username,
//         password:password
                        
//     })

//     res.json({
//         message:"you are signed up"
//     })
//     console.log(users)
// });

// app.post("/signin", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = users.find(user => user.username === username && user.password === password);      /// map and filters!!

//     if (user) {
//         const token = jwt.sign({            // token is generated which with help of secret key u assigned
//             username: user.username         // will include your username 
//         }, JWT_SECRET);

//         res.header("jwt",token)       // $$ to send token back in response headers. it will not send change or add in  request header

//         res.send({
//             token: token        // token is sent as a response
//         })
//         console.log(users);
//     } else {
//         res.status(403).send({
//             message: "Invalid username or password"
//         })
//     }
// });

// function auth (req,res,next){

//     const token = req.headers.token;
//     const info= jwt.verify(token,JWT_SECRET);
// if(info.username){
//     req.username=info.username      // %%   username from info that is the verified usernbame is passed to next handlers now with req.username 
//     next();
// }
// else{
//     res.status(401).send({
//         message: "Unauthorized"
//     })
// }

// }

// // %% so here auth middleware is introduced. so we will check for verificarion of JWT in it only if verification is sucessfull than only next port will be hit.  as here if auth middleware is sucessfully executed then only "/me" will be executed and user gets its data.

// // %% when next will hit function reaches next middleware handler in middleware chain

// app.get("/me", auth, (req, res) => {
//     const user = users.find(user => user.username === req.username);

//     if (user) {
//         res.send({
//             username: user.username,
//             password:user.password
//         });
//     } else {
//         res.status(401).send({
//             message: "Unauthorized"
//         });
//     }
// });

// app.listen(3000);

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const JWT_SECRET = "hello_ahemdabad";
const users = [];

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/bsm', (req, res) =>{
    res.sendFile(path.join(__dirname,'public','bsm.html'))
    }) 
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API endpoints
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token: token,
            message: "Signed in successfully"
        });
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
});

// Auth middleware
const auth = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Protected route
app.get("/me", auth, (req, res) => {
    const user = users.find(user => user.username === req.username);
    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(401).json({ message: "User not found" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});