const express = require('express');
const app = express();

// SETUP BODY PARSING
app.use( express.json() ) // => applied to BEFORE EVERY request

let fruits = [
  { id: "1", name: 'Banana', color: 'yellow'},
  { id: "2", name: 'Cherry', color: 'red'},
  { id: "3", name: 'Lemon', color: 'yellow'},
  { id: "4", name: 'Apple', color: 'green'},
  { id: "5", name: 'Orange', color: 'orange'}
]

app.get('/fruits', (req, res) => {
  res.json(fruits)
});

app.get('/fruits/:id', (req, res) => {
  let fruit = fruits.find(fruit => fruit.id == req.params.id)
  res.json(fruit)
})

app.post('/fruits', (req, res) => {
  let fruitNew = {...req.body}
  fruits.push(fruitNew)
  res.json(fruit)
})

app.patch('/fruits/:id', (req, res) => {
  let fruitToUpdate = fruits.find(fruit => fruit.id == req.params.id)
  Object.assign(fruitToUpdate, {...req.body})
  res.json(fruitToUpdate)
})

app.delete('/fruits/:id', (req, res) => {
  fruits = fruits.filter(fruit => fruit.id !== req.params.id)
  res.json(fruits)
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.