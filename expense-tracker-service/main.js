const { startApp } = require(`./configs/basic`)
const { sql } = require(`./configs/database`)
const app = startApp()
const { getCategories, createNewCategory, getOneCategories,
  updateCategories, deleteCategories } = require("./services/categoryService")

const fs = require('fs')
const content = fs.readFileSync('data/categories.json', "utf-8")
let categories = JSON.parse(content)

app.get("/categories", async (req, res) => {
  const categories = await getCategories()
  res.json(categories)
})

app.get("/categories/:id", async (req, res) => {
  const { id } = req.params
  const list = await getOneCategories(id)
  if (list.length) {
    return list[0];
  }
  return null;
})

app.post("/categories", async (req, res) => {
  const { name } = req.body
  const list= await createNewCategory(name)
  res.json(list)
})

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params
  const { input } = req.body;
  const list = await updateCategories(id, input)
  res.status(201).json({list})
})

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params
  await deleteCategories(id)
  res.sendStatus(204)
})



