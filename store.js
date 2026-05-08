const fs = require('fs')
const path = require('path')
const fn = path.resolve(__dirname, 'data.json')
const loadData = () => {
  const defaultData = {
    guests: [],
    prefs: {music: [], food: [], theme: ''},
    budget: {limit: 50000, items: []},
    tasks: []
  }
  try {
    const raw = fs.readFileSync(fn, 'utf8')
    if (raw){
      const json = JSON.parse(raw)
      if (json){
        return json
      }
    }
  } catch (e) {
  }
  fs.writeFileSync(fn, JSON.stringify(defaultData, null, 2))
  return defaultData
}
const saveData = (data) => {
  fs.writeFileSync(fn, JSON.stringify(data, null, 2))
}
module.exports = {loadData, saveData}
