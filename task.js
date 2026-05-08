const st = require('./store')
const addTask = (title, dateText) => {
  const date = new Date(dateText)
  if (date.toString() === 'Invalid Date'){
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
  const today = now.toISOString().slice(0, 10)
  for (let i = 0; i < data.tasks.length; i++){
    const item = data.tasks[i]
    if (filter === 'all' || !filter){
      result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
    } else if (filter === 'today' && item.date === today){
      result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
    } else if (filter === '3'){
      const taskDate = new Date(item.date)
      const diff = taskDate.getTime() - now.getTime()
      if (diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000){
        result += `${i + 1}. ${item.title} ${item.date} ${item.status}\n`
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
  const today = new Date().toISOString().slice(0, 10)
  for (let i = 0; i < data.tasks.length; i++){
    const item = data.tasks[i]
    if (item.date === today && item.status !== 'готово'){
      result += `${item.title} ${item.date}\n`
    }
  }
  return result
}
module.exports = {addTask, listTasks, completeTask, todayTasks}
