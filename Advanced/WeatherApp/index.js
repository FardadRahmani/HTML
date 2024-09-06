import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const BaseURL= "https://api.openweathermap.org/data/2.5/forecast?";
const ApiKey= "78073aa92bcae12b800945ccd75fbe7d"
// https://api.openweathermap.org/data/2.5/forecast?lat=48.786419&lon=9.180303&appid=78073aa92bcae12b800945ccd75fbe7d
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    console.log(result);
    console.log(result);
    res.render("index.ejs", { data: result });
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

  
});

app.post("/", async (req, res) => {
  

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  const chosenCity= req.body.type;
  var lat = 1.5;
  var lon = 1.5;
  

  console.log(chosenCity);

  switch (chosenCity) {
    case 'Stuttgart':
      lat = 48.786419;
      lon = 9.180303;
      break;

    case "London":
      lat = 51.507364;
      lon = -0.127688;
      break;

    case "Berlin":
      lat = 52.518481;
      lon = 13.404649;
      break;

    case "Teheran":
      lat = 35.722299;
      lon = 51.331406;
      break;

    case "BangKok":
      lat = 13.756656;
      lon = 100.501812;
      break;

    case "Shanghai":
      lat = 31.230006;
      lon = 121.474114;
      break;

    case "New-York":
      lat = 42.899352;
      lon = -76.001475;
      break;

    case "Casablanca":
      lat = 33.573025;
      lon = -7.589924;
      break;

    case "Bagdad":
      lat = 33.315157;
      lon = 44.366151;
      break;
  
    default:
      console.log("None applied")
      break;
  }

  console.log(lat, lon);

  try {
    const response = await axios.get(BaseURL + `lat=${lat}&lon=${lon}&appid=${ApiKey}`);
    const result = response.data;
    let celsius= result.list[0].main.temp - 273.15;
    let description= result.list[0].weather[0].description;
    console.log(result.list[0].weather[0].description);
    console.log(celsius);
    // let randomActivityNumber= Math.floor(Math.random()*(result.length));
    // let randomActivity= result[randomActivityNumber];
    // console.log(randomActivity.activity + "joooon");
    res.render("index.ejs", { 
      data: celsius,
      city: chosenCity,
      desc: description
     });
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }



  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
