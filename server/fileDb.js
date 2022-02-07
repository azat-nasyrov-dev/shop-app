const fs = require('fs');
const {nanoid} = require('nanoid');

const filename = './db.json';

let data = [];

module.exports = {
  init() {
    try {
      const fileContents = fs.readFileSync(filename);
      data = JSON.parse(fileContents);
    } catch (e) {
      data = [];
    }
  },
  getItems() {
    return data;
  },
  addItem(item) {
    item.id = nanoid();
    data.push(item);
    this.save();
  },
  getItemById(id) {
    return data.find(item => item.id === id);
  },
  save() {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  }
}