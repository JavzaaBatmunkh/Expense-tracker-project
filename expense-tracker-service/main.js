const { startApp } = require(`./configs/basic`)
const app = startApp()
const { getCategories, createNewCategory, getOneCategories,
  updateCategories, deleteCategories, getTransaction, createNewTransaction,
  updateTransaction, deleteTransaction} = require("./services/categoryService")

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
  const list= await createNewCategory(req.body)
  res.json(list)
})

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params
  const list = await updateCategories(id, req.body)
  res.status(201).json({list})
})

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params
  await deleteCategories(id)
  res.sendStatus(204)
})

app.get("/transaction", async (req, res) => {
  const transaction = await getTransaction()
  res.json(transaction)
})

// app.post("/transaction", async (req, res) => {
//   const list= await createNewTransaction(req.body)
//   res.json(list)
// })

// app.put("/transaction/:id", async (req, res) => {
//   const { id } = req.params
//   const list = await updateTransaction(id, req.body)
//   res.status(201).json({list})
// })

// app.delete("/transaction/:id", async (req, res) => {
//   const { id } = req.params
//   await deleteTransaction(id)
//   res.sendStatus(204)
// })


