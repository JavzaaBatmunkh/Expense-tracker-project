const { sql } = require(`../configs/database`);

async function getTotalIncome() {
  const list = await sql`SELECT SUM(amount)
FROM transaction
WHERE type = 'INCOME';`;
  if (list.length) {
    return list[0];
  }
  return null;
}

async function getTotalExpense() {
  const list = await sql`SELECT SUM(amount)
FROM transaction
WHERE type = 'EXPENSE';`;
  if (list.length) {
    return list[0];
  }
  return null;
}

async function getSumByCategories() {
  const list = await sql`SELECT categories.name, SUM(transaction.amount)
FROM transaction
LEFT JOIN categories 
  ON transaction.categoryId = categories.id 
WHERE transaction.type = 'EXPENSE'
GROUP BY categories.id;`;
  return list;
}


module.exports = {
  getTotalIncome, getTotalExpense, getSumByCategories

}