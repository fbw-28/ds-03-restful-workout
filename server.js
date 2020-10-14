const express = require("express");
const app = express();

let fruits = [
  { id: "1", name: "Banana", color: "yellow" },
  { id: "2", name: "Cherry", color: "red" },
  { id: "3", name: "Lemon", color: "yellow" },
  { id: "4", name: "Apple", color: "green" },
  { id: "5", name: "Orange", color: "orange" },
];

app.use(express.json());

app.get("/fruits", (req, res) => {
  res.json(fruits);
});

app.get("/fruits/colors", (req, res) => {
  const allColors = fruits.map((item) => item.color);
  console.log(allColors);
  const uniqColors = [...new Set(allColors)];
  console.log(uniqColors)

  res.json(uniqColors);
});

app.get("/fruits/plain", (req, res) => {
  console.log("plain");
  const plainFruits = fruits.map((item) => item.name);
  console.log(plainFruits);
  res.json(plainFruits);
});

app.get("/fruits/:id", (req, res) => {
  let id = req.params.id;
  let myFruit = fruits.find((item) => item.id == id);
  res.json(myFruit);
});

app.post("/fruits", (req, res) => {
  console.log(req.body);
  fruits.push(req.body);
  res.json("a new fruit added");
});

app.delete("/fruits/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fruits = fruits.filter((item) => item.id !== id);
  res.json({ message: `fruit with id ${id} is deleted` });
});

app.patch("/fruits/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  let myUpdate = fruits.find((item) => item.id === id);

  if (myUpdate) {
    Object.assign(myUpdate, { ...req.body });
    res.json(myUpdate);
  } else {
    res.json("there is no fruit with this id");
  }
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

//Run app, then load http://localhost:5000 in a browser to see the output.
