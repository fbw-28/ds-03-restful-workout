const express = require('express');
const app = express();

app.use(express.json())

let fruits = [
  { id: "1", name: 'Banana', color: 'yellow'},
  { id: "2", name: 'Cherry', color: 'red'},
  { id: "3", name: 'Lemon', color: 'yellow'},
  { id: "4", name: 'Apple', color: 'green'},
  { id: "5", name: 'Orange', color: 'orange'}
]

// @ GET - Display all
app.get('/fruits', (req, res) => {
  const sortFruits = fruits.sort((a,b)=> a.id-b.id)
  res.json(sortFruits)
});

// @ GET single fruit
app.get('/fruits/:id', (req, res) => {
  const {id} = req.params;
  const findFruit = fruits.find(item=> item.id === id);
  res.json(findFruit)
})

// @ POST - Add new fruit
app.post("/fruits/add", (req,res)=>{
  const{name} =req.body;
  const checkName = fruits.find(fruit=>fruit.name === name)
  if(checkName){
    res.json({message: "Fruit already stored in Database!"})
    return;
  }
  const newFruit = req.body;
  fruits.push(newFruit);
  res
  .redirect("/fruits")
  console.log("New fruit added succesfully!");
})

// @ PATCH - Update fruit

app.patch("/fruits/:id", (req,res)=>{

  const {id} = req.params;
  const findFruit = fruits.find(fruit=>fruit.id == id);
  if(!findFruit){
    res.json({message: "Fruit not found"})
    return;
  }
  const update = findFruit && Object.assign(findFruit, {...req.body});

  res.redirect("/fruits");
})

// @ DELETE - item

app.delete("/fruits/:id", (req,res)=>{
  const {id} = req.params;
  fruitCheck = fruits.find(fruit=> fruit.id === id);
  fruits = fruits.filter(fruit=> fruit.id !== id);
  res.json({message: `Fruit "${fruitCheck.name}" deleted!`})
})
app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.