// //jshint esversion:6
// const express = require("express");
// const mongoose = require("mongoose");
// const { object } = require("webidl-conversions");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const port = 5000;


// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());




// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ToDoApp', { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => {
//         console.log("Connected to db");
//     })


// const userSchema = {
//     username: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// };

// const User = mongoose.model("User", userSchema);

// app.route("/")
//     .get((req, res) => {
//         User.find()
//             .then((result, err) => {
//                 if (err) {
//                     console.log("error found : " + err)
//                     return
//                 }
//                 res.send(result);
//             })

//     })

// app.route("/sign")
//     .post((req, res) => {

//         User.findOne({ username: req.body.username })
//             .then((result) => {
//                 if (result) {
//                     res.send({result : 'fail'})
//                 } else {
//                     let newUser = new User({
//                         username: req.body.username,
//                         password: req.body.password,
//                         name: req.body.name
//                     })

//                     newUser.save().then((result, err) => {
//                         if (err) {
//                             console.log("----------Error---------\n" + err);
//                             res.send("----------Error---------\n" + err);
//                         } else {
//                             console.log("Post Successful");
//                             res.send({result : 'success'});
//                         }
//                     })
//                 }
//             })
//     })


// app.route("/login/:username/:password")
//     .get((req, res) => {
//         let username = req.params.username;
//         let password = req.params.password;
//         console.log(username + " " + password)

//         User.findOne({ username: username, password: password })
//             .then((result) => {
//                 if (result) {
//                     res.send({ user: 'success', pass: 'success' })
//                 } else {
//                     User.findOne({ username: username })
//                         .then((result) => {
//                             if (result) {
//                                 res.send({ user: 'success', pass: 'fail' })
//                             } else {
//                                 res.send({ user: 'fail', pass: 'fail' })
//                             }
//                         })
//                     }
                        
//             })
//     })



// app.listen(process.env.PORT || port, () => {
//     console.log("server started on " + " " + port);
// })

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://ayush:123456ayush@clus.oz2frgu.mongodb.net/pdflex?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define User schema
const credSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create User model
const User = mongoose.model('Cred', credSchema);

// Define a route to create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send({ msg: 'pass', _id: newUser._id.toString(), username: newUser.username });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).send({ msg: 'fail', error: 'Username already exists' });
        } else {
            res.status(400).send({ msg: 'fail', error: error.message });
        }
    }
});

// Define a route to retrieve userId by username and password
app.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).send({ msg: 'pass', _id: user._id.toString() , username: username });
        } else {
            res.status(404).send({ msg: 'fail', error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).send({ msg: 'fail', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
