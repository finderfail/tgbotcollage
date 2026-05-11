const st = require('./store')
const { parseRusDate, formatRusDate } = require('./date')
const addTask = (title, dateText) => {
  const date = parseRusDate(dateText)
  if (!date){
    return 'неверная дата'
  }
  const data = st.loadData()
  data.tasks.push({title, date: dateText, status: 'в работе'})
  st.saveData(data)
  return 'задача добавлена'
}
const listTasks = (filter) => {
  const data = st.loadData()
  if (data.tasks.length === 0){
    return 'нет задач'
  }
  let result = 'Задачи:\n'
  const now = new Date()
  const today = formatRusDate(now)
  for (let i = 0; i < data.tasks.length; i++){
    const item = data.tasks[i]
    if (filter === 'all' || !filter){
      result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
    } else if (filter === 'today' && item.date === today){
      result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
    } else if (filter === '3'){
      const taskDate = parseRusDate(item.date)
      if (taskDate){
        const diff = taskDate.getTime() - now.getTime()
        if (diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000){
          result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
        }
      }
    } else if (filter === 'done' && item.status === 'готово'){
      result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
    }
  }
  return result
}
const completeTask = (title) => {
  const data = st.loadData()
  let task = null
  for (let i = 0; i < data.tasks.length; i++){
    if (data.tasks[i].title === title){
      task = data.tasks[i]
    }
  }
  if (!task){
    return 'задача не найдена'
  }
  task.status = 'готово'
  st.saveData(data)
  return 'задача выполнена'
}
const todayTasks = () => {
  const data = st.loadData()
  let result = 'Задачи на сегодня:\n'
  const today = formatRusDate(new Date())
  for (let i = 0; i < data.tasks.length; i++){
    const item = data.tasks[i]
    if (item.date === today && item.status !== 'готово'){
      result += `${item.title} ${item.date}\n`
    }
  }
  return result
}
module.exports = {addTask, listTasks, completeTask, todayTasks}
