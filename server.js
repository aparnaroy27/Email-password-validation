const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.listen(3005, ()=>{
    console.log("server is running on port number 3005");
});

let registeredEmails = []; // Array to store registered email addresses
let registeredUsers = [];

app.use(bodyParser.json());

// app.use(express.json());

app.use(express.static(__dirname));

app.get("/",(req,res) =>{
    res.sendFile("index.html",{root:__dirname});
});

app.post("/contact", (req,res) =>{
    const { Myemail, Myusername, Mypassword } = req.body;

    // Check if email is provided
    if (!Myemail) {
        return res.status(400).json({ error: "Email is required" });
    }
    
    // Check if email already exists
    if (registeredEmails.includes(Myemail)) {
        return res.status(400).json({ error: "Email already registered" });
    }
    
    // If email doesn't exist, add it to registered emails
    registeredEmails.push(Myemail);

    // Check if email is provided
    if (!Myemail || !Mypassword) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Check if email already exists
    if (registeredUsers.some(user => user.Myemail === Myemail)) {
        return res.status(400).json({ error: "Email already registered" });
    }
    
    // If email doesn't exist, add user to registered users
    registeredUsers.push({ Myemail, Myusername, Mypassword });
    
    // Log the signup data to the terminal
    console.log("Signup Data:", { Myemail, Myusername, Mypassword });

    // Here, you can save the user details to your database or any other desired action
    // For now, let's just send a success response
    res.status(200).json({ message: "Signup successful" });
});

// app.post("/contact1",(req,res) =>{
//     // console.log(req.body);

//     const { Myemail, Mypassword } = req.body;

//     // Check if email and password are provided
//     if (!Myemail || !Mypassword) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     // Check if the provided credentials match any registered user
//     const user = registeredUsers.find(user => user.Myemail === Myemail && user.Mypassword === Mypassword);
//     if (user) {
//         // Successful login
//         res.status(200).json({ message: "Login successful" });
//     } else {
//         // Failed login
//         res.status(401).json({ error: "Invalid email or password" });
//     }  
// });

app.post("/contact1", (req, res) => {
    const { Myemail, Mypassword } = req.body;

    // Check if email and password are provided
    if (!Myemail || !Mypassword) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the provided email exists
    const userWithEmail = registeredUsers.find(user => user.Myemail === Myemail);

    if (!userWithEmail) {
        // Email not found, return specific error message
        return res.status(401).json({ error: "Incorrect email" });
    }

    // Check if the provided password matches the stored password for the email
    if (userWithEmail.Mypassword !== Mypassword) {
        // Password does not match, return specific error message
        return res.status(401).json({ error: "Incorrect password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful" });
});

