const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function getCategories() {
  const content = fs.readFileSync('data/categories.json', "utf-8")
  let categories = JSON.parse(content)
  return categories;
}

function createNewCategory(name) {
  const content = fs.readFileSync('data/categories.json', "utf-8")
  let categories = JSON.parse(content)
  categories.push({ name: name, id: uuidv4() })
  fs.writeFileSync('data/categories.json', JSON.stringify(categories))
}
function getOneCategories(id) {
  const content = fs.readFileSync('data/categories.json', "utf-8")
  let categories = JSON.parse(content)
  const category = categories.find(cat => cat.id === id)
  return category;
}
function updateCategories(index, newName) {
  const content = fs.readFileSync('data/categories.json', "utf-8")
  let categories = JSON.parse(content)
  categories[index].name = newName;
  fs.writeFileSync('data/categories.json', JSON.stringify(categories));
}
function deleteCategories(index) {
  const content = fs.readFileSync('data/categories.json', "utf-8")
  let categories = JSON.parse(content)
  categories.splice(index, 1);
  fs.writeFileSync('data/categories.json', JSON.stringify(categories));
}
module.exports = {
  getCategories, createNewCategory, getOneCategories,
  updateCategories, deleteCategories
}