// //jshint esversion:6
// const express = require("express");
// const mongoose = require("mongoose");
// const { object } = require("webidl-conversions");
// const bodyParser = require("body-parser");
// const port = 5000;

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connect('mongodb://127.0.0.1:27017/ToDoApp', { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => {
//         console.log("Connected to db");
//     })

// const taskSchema = {
//     username: {
//         type: String,
//         required: true
//     },
//     task: {
//         type: String,
//         required: true,
//     }
// };

// const User = mongoose.model("Task", taskSchema);
