const express = require("express");
const app = express();
const morgan = require("morgan");

let fruits = [
  { id: "1", name: "Banana", color: "yellow" },
  { id: "2", name: "Cherry", color: "red" },
  { id: "3", name: "Lemon", color: "yellow" },
  { id: "4", name: "Apple", color: "green" },
  { id: "5", name: "Orange", color: "orange" },
];

app.use(morgan());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our API</h1>");
});

app.get("/fruits", (req, res) => {
  res.json(fruits);
});

// Bonus 1

const getFruits = (req, res, next) => {
  const { id } = req.params;
  if (id === "plain") {
    const output = fruits.map((item) => item.name);
    res.send(output);
  } else {
    next();
  }
}

// Bonus 2

const getColors = (req, res, next) => {
  const { id } = req.params;
  if (id === "colors") {
    let output = fruits.map((item) => item.color);
    output = output.filter(
      (item) => output.indexOf(item) === output.lastIndexOf(item)
    );
    res.send(output);
  } else {
    next();
  }
};

app.get("/fruits/:id",getFruits, getColors, (req, res) => {
  const { id } = req.params;
  res.json(fruits.find((item) => item.id === id));
});

app.post("/fruits", (req, res) => {
  console.log(req.body);
  const { name, color } = req.body;
  if (name && color) {
    let newId = Date.now().toString();
    const newFruit = { id: newId, name, color };
    fruits.push(newFruit);
    res
      .status(201)
      .json({ message: "new fruit successfully added", fruit: newFruit });
  } else {
    res
      .status(500)
      .json({ message: "Please provide name & color property in POST body" });
  }
});

app.patch("/fruits/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { name, color } = req.body;
  const changedObj = fruits.find((item) => item.id === id);
  if (changedObj && name && color) {
    Object.assign(changedObj, { name, color });
    res.json(changedObj);
  } else {
    res.status(500);
  }
});

app.delete("/fruits/:id", (req, res) => {
  const { id } = req.params;
  fruits = fruits.filter((item) => item.id !== id);
  res.json(fruits);
});

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

//Run app, then load http://localhost:5000 in a browser to see the output.
