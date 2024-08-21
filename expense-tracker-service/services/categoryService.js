const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { sql } = require(`../configs/database`);

async function getCategories() {
  const list = await sql`select * from categories`;
  console.log({list})
  return list;
}

async function createNewCategory(name) {
  const id=uuidv4() 
  await sql`INSERT INTO categories (id, name) VALUES(${id}, ${name})`
  return id;

}
// function getOneCategories(id) {
//   const content = fs.readFileSync('data/categories.json', "utf-8")
//   let categories = JSON.parse(content)
//   const category = categories.find(cat => cat.id === id)
//   return category;
// }
// function updateCategories(index, newName) {
//   const content = fs.readFileSync('data/categories.json', "utf-8")
//   let categories = JSON.parse(content)
//   categories[index].name = newName;
//   fs.writeFileSync('data/categories.json', JSON.stringify(categories));
// }
// function deleteCategories(index) {
//   const content = fs.readFileSync('data/categories.json', "utf-8")
//   let categories = JSON.parse(content)
//   categories.splice(index, 1);
//   fs.writeFileSync('data/categories.json', JSON.stringify(categories));
// }
module.exports = {
  getCategories, createNewCategory
}

// getOneCategories,
//   updateCategories, deleteCategories
// createNewCategory,