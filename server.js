const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

app.use(express.json());

let fruits = [
  { id: "1", name: "Banana", color: "yellow" },
  { id: "2", name: "Cherry", color: "red" },
  { id: "3", name: "Lemon", color: "yellow" },
  { id: "4", name: "Apple", color: "green" },
  { id: "5", name: "Orange", color: "orange" },
];

app.get("/fruits", (req, res) => {
  res.json(fruits);
});

app.get("/fruits/:id", (req, res) => {
  let { id } = req.params;
  let fruit = fruits.find((fruit) => fruit.id == id);
  res.json(fruit);
});

app.post("/fruits", (req, res) => {
  if (!req.body.name) {
    return res.send({ error: "Please provide a name field!" });
  }
  let newFruit = { id: (fruits.length + 1).toString(), ...req.body };
  fruits.push(newFruit);
  res.send(newFruit);
});

app.patch("/fruits/:id", (req, res) => {
  const { id } = req.params;
  let fruit = fruits.find((fruit) => fruit.id == id);
  Object.assign(fruit, { ...req.body });
  res.send(fruit);
});

app.delete("/fruits/:id", (req, res) => {
  const { id } = req.params;
  let fruit = fruits.find((fruit) => fruit.id == id);
  fruits = fruits.filter((fruit) => fruit.id != id);
  res.send(fruit);
});

//Run app, then load http://localhost:5000 in a browser to see the output.
