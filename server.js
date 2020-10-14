const express = require("express");
const app = express();

// Port
let PORT = 5001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// Middleware to parse
app.use(express.json());

let fruits = [
  { id: "1", name: "Banana", color: "yellow" },
  { id: "2", name: "Cherry", color: "red" },
  { id: "3", name: "Lemon", color: "yellow" },
  { id: "4", name: "Apple", color: "green" },
  { id: "5", name: "Orange", color: "orange" },
];

// get  all fruits
app.get("/fruits", (req, res) => {
  res.json(fruits);
});

// more specific routes go on the top
app.get("/fruits/plain", (req, res) => {
  console.log("ROUTE CALLED!!");
  const fruitsArray = fruits.map((fruit) => fruit.name);
  res.json(fruitsArray);
});

// get one fruit by id
app.get("/fruits/:id", (req, res) => {
  const { id } = req.params;
  console.log(`ID sent to us: ${id}`);
  let fruitFound = fruits.find((fruit) => fruit.id == id);
  res.json(fruitFound);
});

// POST adding a fruit DO I NEED REQ.BODY?
app.post("/fruits", (req, res) => {
  const newFruit = req.body;
  fruits.push(newFruit);
  res.json(newFruit);
  // res.json({
  //   id: 6,
  //   name: "Avocado",
  //   color: "green",
  // });
});

// PATCH update a fruit
app.patch("/fruits/:id", (req, res) => {
  let { id } = req.params;
  let fields = req.body;
  let fruitUpdated = fruits.find((fruit) => fruit.id === id);
  if (fruitUpdated) {
    Object.assign(fruitUpdated, { ...req.body });
    res.send(fruitUpdated);
  } else {
    res.json({ message: "No new updates!" });
  }
  res.json({});
});

//Run app, then load http://localhost:5000 in a browser to see the output.
