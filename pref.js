const st = require('./store')
const hasValues = (arr) => {
  if (!arr){
    return false
  }
  if (arr.length === 0){
    return false
  }
  return true
}
const addPrefs = (musicList, foodList, theme) => {
  const data = st.loadData()
  if (!hasValues(musicList) || !hasValues(foodList) || !theme){
    return 'неверные данные'
  }
  for (let i = 0; i < musicList.length; i++){
    data.prefs.music.push(musicList[i])
  }
  for (let i = 0; i < foodList.length; i++){
    data.prefs.food.push(foodList[i])
  }
  data.prefs.theme = theme
  st.saveData(data)
  return 'предпочтения сохранены'
}
const topPrefs = () => {
  const data = st.loadData()
  if (!data.prefs.theme){
    return 'предпочтения не заданы'
  }
  const musicCount = {}
  const foodCount = {}
  for (let i = 0; i < data.prefs.music.length; i++){
    const item = data.prefs.music[i]
    if (musicCount[item]){
      musicCount[item] = musicCount[item] + 1
    } else {
      musicCount[item] = 1
    }
  }
  for (let i = 0; i < data.prefs.food.length; i++){
    const item = data.prefs.food[i]
    if (foodCount[item]){
      foodCount[item] = foodCount[item] + 1
    } else {
      foodCount[item] = 1
    }
  }
  const musicKeys = []
  const foodKeys = []
  for (const key in musicCount){
    musicKeys.push(key)
  }
  for (const key in foodCount){
    foodKeys.push(key)
  }
  musicKeys.sort((a,b) => musicCount[b] - musicCount[a])
  foodKeys.sort((a,b) => foodCount[b] - foodCount[a])
  let text = 'Топ музыка:\n'
  for (let i = 0; i < 3 && i < musicKeys.length; i++){
    text += `${i + 1}. ${musicKeys[i]}\n`
  }
  text += 'Топ еда:\n'
  for (let i = 0; i < 3 && i < foodKeys.length; i++){
    text += `${i + 1}. ${foodKeys[i]}\n`
  }
  text += `Тема: ${data.prefs.theme}`
  return text
}
module.exports = {addPrefs, topPrefs}
