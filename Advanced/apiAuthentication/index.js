import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "farijun";
const yourPassword = "ILoveMyself";
const yourAPIKey = "a5dc3f3e-a630-4c64-b8d5-c4f090411038";
const yourBearerToken = "26712b29-e418-4182-b1db-cb1f9ddf3e4f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;
    let strResult = JSON.stringify(result);
    console.log(strResult);

    res.render("index.ejs", { content: strResult });
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  res.render("index.ejs", { content: "API Response." });
}});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */


    try {
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", { 
        auth: { 
          username: yourUsername,
          password: yourPassword,
        }
      });

      const result = response.data;
      let strResult = JSON.stringify(result);
      console.log(strResult);
  
      res.render("index.ejs", { content: strResult });
      
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    res.render("index.ejs", { content: "API Response." });
  }

});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.



  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?score=5", { 
      params: { 
        apiKey: yourAPIKey
      }
    });

    const result = response.data;
    let strResult = JSON.stringify(result);
    console.log(strResult);

    res.render("index.ejs", { content: strResult });
    
  } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
      res.render("index.ejs", { content: "API Response." });
    }





});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */


  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });

    const result = response.data;
    let strResult = JSON.stringify(result);
    console.log(strResult);

    res.render("index.ejs", { content: strResult });
    
  } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
      res.render("index.ejs", { content: "API Response." });
    }





});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
