const fs = require('fs').promises;
const {nanoid} = require('nanoid');

const filename = './db.json';

let data = [];

module.exports = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents);
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item) {
    item.id = nanoid();
    data.push(item);
    await this.save();
  },
  async getItemById(id) {
    return data.find(item => item.id === id);
  },
  async save() {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
}