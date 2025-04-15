const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '../urls.json');

const loadUrlsFromFile = () => {
  if (!fs.existsSync(DATA_FILE)) return {};
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Failed to load URL data:', err);
    return {};
  }
}

const saveUrlsToFile = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('❌ Failed to save URL data:', err);
  }
}

module.exports = {
  loadUrlsFromFile,
  saveUrlsToFile,
};
