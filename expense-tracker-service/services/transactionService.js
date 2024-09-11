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


module.exports = {
    getTotalIncome, getTotalExpense

}