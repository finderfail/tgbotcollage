const st = require('./store')
const { parseRusDate } = require('./date')
const addExpense = (item, sumText, dateText) => {
  const sum = parseFloat(sumText)
  if (isNaN(sum) || sum < 0){
    return 'неверная сумма'
  }
  const date = parseRusDate(dateText)
  if (!date){
    return 'неверная дата'
  }
  const data = st.loadData()
  data.budget.items.push({item, sum, date: dateText})
  st.saveData(data)
  return 'расход добавлен'
}
const listExpenses = () => {
  const data = st.loadData()
  if (data.budget.items.length === 0){
    return 'расходов нет'
  }
  let result = 'Расходы:\n'
  let total = 0
  for (let i = 0; i < data.budget.items.length; i++){
    const entry = data.budget.items[i]
    result += `${i + 1}. ${entry.item} ${entry.sum} ${entry.date}\n`
    total = total + entry.sum
  }
  result += `Итого ${total}\nЛимит ${data.budget.limit}`
  if (total > data.budget.limit){
    result += '\nЛимит превышен'
  }
  return result
}
const totalBudget = () => {
  const data = st.loadData()
  let sum = 0
  for (let i = 0; i < data.budget.items.length; i++){
    sum = sum + data.budget.items[i].sum
  }
  let result = `Итого ${sum}\n`
  if (data.budget.limit > 0){
    result += `Остаток ${data.budget.limit - sum}`
  }
  return result
}
const setLimit = (value) => {
  const limit = parseFloat(value)
  if (isNaN(limit) || limit < 0){
    return 'неверный лимит'
  }
  const data = st.loadData()
  data.budget.limit = limit
  st.saveData(data)
  return 'лимит установлен'
}
module.exports = {addExpense, listExpenses, totalBudget, setLimit}
