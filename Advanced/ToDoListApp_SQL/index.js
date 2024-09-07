import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "rootpw",
  port: 5432,
});
db.connect();



let items = [];


async function updateItems() {
  items = [];


  let tempItems= await db.query(
    "SELECT * FROM items"
  );
  tempItems= tempItems.rows;
  // console.log(tempItems);
  tempItems.forEach(element => {
    items.push(element);
  });


}



app.get("/", async (req, res) => {
  await updateItems();
 
  console.log(items);

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  try {
    await db.query(
      "INSERT INTO items(title) VALUES($1)",[item]
    );
    
  } catch (error) {
    console.log(error);
    
  }
  // items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  let updatedItemId = req.body.updatedItemId;
  let updatedItemTitle = req.body.updatedItemTitle;
  console.log(updatedItemTitle);
  try {
    await db.query(
      "UPDATE items SET title=$1 WHERE id=$2",[updatedItemTitle, updatedItemId]
    );
    
  } catch (error) {
    console.log(error);
    
  }
  res.redirect("/");

});

app.post("/delete", async (req, res) => {
  let deletedItemId = req.body.deleteItemId;
  console.log(deletedItemId);
  
  try {
    await db.query(
      "DELETE FROM items WHERE id=$1",[deletedItemId]
    );
    
  } catch (error) {
    console.log(error);
    
  }
  res.redirect("/");
});









app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
