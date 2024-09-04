const { v4: uuidv4 } = require('uuid');
const { sql } = require(`../configs/database`);

async function getCategories() {
  const list = await sql`select * from categories order by name`;
  console.log({ list })
  return list;
}

async function createNewCategory({name, color, icon}) {
  console.log({name, color, icon})
  const id = uuidv4()
  await sql`INSERT INTO categories (id, name, color, icon) VALUES(${id}, ${name}, ${color}, ${icon} )`
  return id;
}
async function getOneCategories(id) {
  const list = await sql`select * from categories where id=${id}`;
  console.log({ list })
  return list;
}
async function updateCategories(id, {newName, color, icon}) {
  await sql`update categories set name=${newName}, color=${color}, icon=${icon} where id=${id}`
}
async function deleteCategories(id) {
  await sql`delete from categories where id=${id}`;
}

async function getTransaction() {
  const list = await sql`select transaction.id, transaction.amount, transaction.type, transaction.time, categories.name, categories.icon, categories.color from transaction left join categories on transaction.categoryId = categories.id `;
  console.log({ list })
  return list;
}
async function getOneTransaction(id) {
  const list = await sql`select * from transaction where id=${id} `;
  if (list.length) {
    return list[0];
  }
  return null;
}
async function createNewTransaction({amount, categoryid, type, date, time, payee, note}) {
  const id = uuidv4()
  await sql`INSERT INTO transaction (id, amount, categoryid, type, date, time, payee, note) VALUES(${id}, ${amount}, ${categoryid}, ${type}, ${date}, ${time},${payee},${note} )`
  return id;
}
async function updateTransaction(id, {amount, categoryid, type, date, time, payee, note}) {
  await sql`update transaction set amount=${amount}, categoryid=${categoryid}, type=${type}, date=${date}, payee=${payee}, time=${time}, note=${note} where id=${id}`
}
async function deleteTransaction(id) {
  await sql`delete from transaction where id=${id}`;
}

module.exports = {
  getCategories, createNewCategory, getOneCategories,getOneTransaction,
  updateCategories, deleteCategories, getTransaction, createNewTransaction, updateTransaction, deleteTransaction
}
