const { startApp } = require(`./configs/basic`)
const app = startApp()
const { getCategories, createNewCategory, getOneCategories,
  updateCategories, deleteCategories, getTransaction, createNewTransaction,
  updateTransaction, deleteTransaction, getOneTransaction, getTransactionFiltered, getTransactionFilteredByType, getTransactionFilteredBy2 } = require("./services/categoryService")
const {getTotalIncome, getTotalExpense}=require("./services/transactionService")

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
  const list = await createNewCategory(req.body)
  res.json(list)
})

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params
  const list = await updateCategories(id, req.body)
  res.status(201).json({ list })
})

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params
  try {
    await deleteCategories(id)
    res.sendStatus(204)

  }
  catch (error) {
    console.log(error)
    res.status(400).json({ message: error })

  }
})

app.get("/transaction", async (req, res) => {
  const { categoryId, filterType } = req.query

  if (categoryId) {
    if (filterType) {
      const transaction = await getTransactionFilteredBy2(categoryId, filterType)
      res.json(transaction)
    } else {
      const transaction = await getTransactionFiltered(categoryId)
      res.json(transaction)
    }
  }
  else if (filterType) {
    const transaction = await getTransactionFilteredByType(filterType)
    res.json(transaction)
  }
  else {
    const transaction = await getTransaction()
    res.json(transaction)
  }
})

app.get("/transaction/:id", async (req, res) => {
  const { id } = req.params
  const list = await getOneTransaction(id)
  console.log({ list })
  res.json(list)
})

app.post("/transaction", async (req, res) => {
  const list = await createNewTransaction(req.body)
  res.json(list)
})

app.put("/transaction/:id", async (req, res) => {
  const { id } = req.params
  const list = await updateTransaction(id, req.body)
  res.status(201).json({ list })
})

app.delete("/transaction/:id", async (req, res) => {
  const { id } = req.params
  await deleteTransaction(id)
  res.sendStatus(204)
})

app.get("/totalIncome", async (req, res) => {
  const totalIncome = await getTotalIncome()
  res.json(totalIncome)
})

app.get("/totalExpense", async (req, res) => {
  const totalExpense = await getTotalExpense()
  res.json(totalExpense)
})


