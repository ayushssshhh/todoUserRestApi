//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const { object } = require("webidl-conversions");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ToDoApp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to db");
    })


const userSchema = {
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
};

const User = mongoose.model("User", userSchema);

app.route("/")
    .get((req, res) => {
        User.find()
            .then((result, err) => {
                if (err) {
                    console.log("error found : " + err)
                    return
                }
                res.send(result);
            })

    })

app.route("/sign")
    .post((req, res) => {

        User.findOne({ username: req.body.username })
            .then((result) => {
                if (result) {
                    res.send({result : 'fail'})
                } else {
                    let newUser = new User({
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name
                    })

                    newUser.save().then((result, err) => {
                        if (err) {
                            console.log("----------Error---------\n" + err);
                            res.send("----------Error---------\n" + err);
                        } else {
                            console.log("Post Successful");
                            res.send({result : 'success'});
                        }
                    })
                }
            })
    })


app.route("/login/:username/:password")
    .get((req, res) => {
        let username = req.params.username;
        let password = req.params.password;
        console.log(username + " " + password)

        User.findOne({ username: username, password: password })
            .then((result) => {
                if (result) {
                    res.send({ user: 'success', pass: 'success' })
                } else {
                    User.findOne({ username: username, password: password })
                        .then((result) => {
                            if (result) {
                                res.send({ user: 'success', pass: 'fail' })
                            } else {
                                res.send({ user: 'fail', pass: 'fail' })
                            }
                        })
                    }
                        
            })
    })



app.listen(process.env.PORT || port, () => {
    console.log("server started on " + " " + port);
})
