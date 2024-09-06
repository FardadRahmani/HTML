//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
//these 3 lines get us the full filePath dynamically:
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import bodyParser from "body-parser";

const userPassword = "ILoveProgramming";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // console.log(__dirname + "/public/index.html");
    res.sendFile(__dirname + "/public/index.html");
  });
  
  // /submit is the route the form is going to send/act on (action-key)
  app.post("/check", (req, res) => {
    // console.log(__dirname + "/public/index.html");
    // res.send("<h1>Your band name is:</h1>"+
    //   "<h2>"+ req.body.street + req.body.pet + "</h2>"
    // );
    if(req.body.password === userPassword){
        res.sendFile(__dirname + "/public/secret.html");
    } else{
        res.sendFile(__dirname + "/public/index.html");
    }
  
    console.log(req.body);
  });
  
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });