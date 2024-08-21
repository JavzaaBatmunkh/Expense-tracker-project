const { startApp } = require(`./configs/basic`)
const { sql } = require(`./configs/database`)
const app = startApp()
const { getCategories, createNewCategory } = require("./services/categoryService")
// , getOneCategories,
//   updateCategories, deleteCategories
const fs = require('fs')
const content = fs.readFileSync('data/categories.json', "utf-8")
let categories = JSON.parse(content)

app.get("/categories", async (req, res) => {
  const categories = await getCategories()
  res.json(categories)
})

app.get("/categories/:id", async (req, res) => {
  const { id } = req.params
  await getOneCategories(id)
  res.json(category)
})

app.post("/categories", async (req, res) => {
  const { name } = req.body
  await createNewCategory(name)
  res.json("success")
})

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params
  const { newName } = req.body;
  const index = categories.findIndex(category => category.id === id);

  if (index !== -1) {
    await updateCategories(index, newName)
    res.json("Category updated successfully");
  } else {
    res.status(404).json("Category not found");
  }
})

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params
  const index = categories.findIndex(category => category.id === id);

  if (index !== -1) {
    await deleteCategories(index)
    res.json("Category deleted successfully");
  } else {
    res.status(404).json("Category not found");
  }
})

app.get("/databaseTest",async (req, res) => {
  const result = await sql`select version()`;
  console.log(result);
  res.json({result})
})

