require('dotenv').config()
const { Telegraf } = require('telegraf')
const guest = require('./guest')
const pref = require('./pref')
const budget = require('./budget')
const task = require('./task')
const token = process.env.TOKEN
if (!token){
  console.log('токен не найден')
  process.exit(1)
}
const bot = new Telegraf(token)
const helpText = 'Команды:\n/guest_add имя email\n/guest_remove имя\n/guest_list\n/invite\n/status имя read|yes|no|прочитано|подтверждено|отклонено\n/pref_add музыка1,музыка2 еда1,еда2 тема\n/pref_top\n/budget_limit значение\n/budget_add статья сумма дата(дд.мм.гггг)\n/budget_list\n/budget_tot\n/task_add название дата(дд.мм.гггг)азвание дата(дд.мм.гггг)\n/task_list all|today|3|done\n/task_done название\n/today_tasks'
const handleText = (ctx) => {
  const msg = ctx.message
  if (!msg || !msg.text){
    return
  }
  const args = msg.text.split(' ')
  const cmd = args[0]
  if (cmd === '/start'){
    ctx.reply('Бот для планирования вечеринки готов. /help')
  } else if (cmd === '/help'){
    ctx.reply(helpText)
  } else if (cmd === '/guest_add'){
    const name = args[1]
    const email = args[2]
    if (!name || !email){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(guest.addGuest(name, email))
    }
  } else if (cmd === '/guest_remove'){
    const name = args[1]
    if (!name){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(guest.removeGuest(name))
    }
  } else if (cmd === '/guest_list'){
    ctx.reply(guest.listGuests())
  } else if (cmd === '/invite'){
    ctx.reply(guest.sendInvites())
  } else if (cmd === '/status'){
    const name = args[1]
    const status = args[2]
    if (!name || !status){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(guest.updateGuestStatus(name, status))
    }
  } else if (cmd === '/pref_add'){
    const music = args[1]
    const food = args[2]
    const theme = args[3]
    if (!music || !food || !theme){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(pref.addPrefs(music.split(','), food.split(','), theme))
    }
  } else if (cmd === '/pref_top'){
    ctx.reply(pref.topPrefs())
  } else if (cmd === '/budget_limit'){
    const value = args[1]
    if (!value){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(budget.setLimit(value))
    }
  } else if (cmd === '/budget_add'){
    const item = args[1]
    const sum = args[2]
    const date = args[3]
    if (!item || !sum || !date){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(budget.addExpense(item, sum, date))
    }
  } else if (cmd === '/budget_list'){
    ctx.reply(budget.listExpenses())
  } else if (cmd === '/budget_tot'){
    ctx.reply(budget.totalBudget())
  } else if (cmd === '/task_add'){
    const title = args[1]
    const date = args[2]
    if (!title || !date){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(task.addTask(title, date))
    }
  } else if (cmd === '/task_list'){
    let filter = args[1]
    if (!filter){
      filter = 'all'
    }
    ctx.reply(task.listTasks(filter))
  } else if (cmd === '/task_done'){
    const title = args[1]
    if (!title){
      ctx.reply('неверные аргументы')
    } else {
      ctx.reply(task.completeTask(title))
    }
  } else if (cmd === '/today_tasks'){
    ctx.reply(task.todayTasks())
  } else {
    ctx.reply('неизвестная команда')
  }
}
bot.on('text', handleText)
bot.launch()
