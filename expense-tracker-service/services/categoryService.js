const { v4: uuidv4 } = require('uuid');
const { sql } = require(`../configs/database`);

async function getCategories() {
  const list = await sql`select * from categories order by name`;
  console.log({ list })
  return list;
}

async function createNewCategory(name, color, icon) {
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

module.exports = {
  getCategories, createNewCategory, getOneCategories,
  updateCategories, deleteCategories
}
