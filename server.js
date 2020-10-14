const express = require('express');
const app = express();
const port= 5000

app.use( express.json() ) // => req.body

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

//GET
app.get('/fruits/:id', (req, res) => {
  console.log(req.params)

  //fruiFound is gonna be an object
  let fruitFound = fruits.find(fruit => fruit.id == req.params.id )

  if(!fruitFound){
    return res.json({message: `we don't have any ${req.params.id}`})
  }else{
    return res.json({message:`we have the ${fruitFound.name} and its color is ${fruitFound.color} ?`})}
})

//POST
app.post('/newfruit', (req, res) => {
  let fruitNew = req.body
  fruits.push(fruitNew)
  res.json(fruitNew)
})

//DELETE
app.delete('/fruits/:id', (req, res) => {
 
/* let id= req.params.id */ //or...
  let { id } = req.params
  let  selectedFruit= fruits.find(fruit=>fruit.id==id)
  fruits = fruits.filter(fruit => id != fruit.id)

  //I get the full object of the specific fruit
   
  console.log(selectedFruit)
  res.json({ message: `${selectedFruit.name} was deleted successfully ` })
})

//PATCH
app.patch('/fruits/:id', (req, res) => {

  let { id } = req.params
  let fields = req.body

  console.log(id, fields)

  // HOW THE FUCK DO I UPDATE A FUCKING OBJECT 
  // IN A FUCKING ARRAY?

  let fruitFound = fruits.find(fruit => fruit.id === id)

  if(fruitFound) {
    Object.assign(fruitFound, {...req.body})
    res.send(fruitFound)
  }
  else {
    res.json({ message: 'What do you think we are here? Please provide someone we know!!!' })
  }

})

//Bonus
app.get("/colors", (req, res) => {
  const allColors = fruits.map((item) => item.color);
  console.log(allColors);
  const uniqColors = [...new Set(allColors)];
  console.log(uniqColors)
  res.json(uniqColors);
});

app.get("/plain", (req, res) => {
  console.log("plain");
  const plainFruits = fruits.map((item) => item.name);
  console.log(plainFruits);
  res.json(plainFruits);
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
//Run app, then load http://localhost:5000 in a browser to see the output.