import express from "express";
import { initializeApp } from 'firebase-admin/app';
import {getAuth}from "firebase-admin/auth"
import { restart } from "nodemon";
var cors = require('cors')

var admin = require("firebase-admin");
var bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }));




var serviceAccount = require("/Users/albertrocha/Desktop/thechat-august-twentytwo-firebase-adminsdk-kq50m-e4a2c3934f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post("/", (req, res) => {
    let email = req.body
    console.log(email.body.email)


    getAuth()
    .getUserByEmail(email.body.email)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.json(userRecord)
    })
    .catch((error) => {
      console.log('Error fetching user data:', );
      res.status(404).send(error)
    });
    
})

app.listen(4000, ()=>console.log("The Express server is running on port 4000"))


