const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
const content = fs.readFileSync('categories.json', "utf-8")
console.log({ content })
let categories = JSON.parse(content)

app.get("/categories", (req, res) => {
  res.json(categories)
})

// app.get("/categories/:id", (req, res) => {
//   const {id}=req.params
//   const category=categories.find(cat.id === id)
//   res.json(category)
// })

app.post("/categories", (req, res) => {
  const { name } = req.body
  categories.push({ name: name, id: new Date().toISOString() })
  fs.writeFileSync('categories.json', JSON.stringify(categories))

  res.json("success")
})

app.put("/categories/:id", (req, res) => {
  const {id}=req.params
  const {newName } = req.body; // Getting the old name and new name from the query parameters

  // console.log({ id, newName })

  const index = categories.findIndex(category => category.id === id); // Finding the category with the old name

  if (index !== -1) { // If the category exists
    categories[index].name = newName; // Update its name
    fs.writeFileSync('categories.json', JSON.stringify(categories)); // Save the updated list back to the file
    res.json("Category updated successfully"); // Send a success message
  } else {
    res.status(404).json("Category not found"); // If the category doesn't exist, send a 404 error
  }

})

app.delete("/categories/:id", (req, res) => {
  const {id}=req.params // Getting the id of the category to delete from the query parameters

  const index = categories.findIndex(category => category.id === id); // Finding the category by its name

  if (index !== -1) { // If the category exists
    categories.splice(index, 1); // Remove it from the list
    fs.writeFileSync('categories.json', JSON.stringify(categories)); // Save the updated list back to the file
    res.json("Category deleted successfully"); // Send a success message
  } else {
    res.status(404).json("Category not found"); // If the category doesn't exist, send a 404 error
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  