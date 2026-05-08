const st = require('./store')
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const addGuest = (guestName, guestEmail) => {
  const data = st.loadData()
  let exists = false
  for (let i = 0; i < data.guests.length; i++){
    if (data.guests[i].name === guestName){
      exists = true
    }
  }
  if (exists){
    return 'гость уже есть'
  }
  if (!emailRe.test(guestEmail)){
    return 'неверный email'
  }
  data.guests.push({name: guestName, email: guestEmail, status: 'новый'})
  st.saveData(data)
  return 'гость добавлен'
}
const removeGuest = (guestName) => {
  const data = st.loadData()
  let index = -1
  for (let i = 0; i < data.guests.length; i++){
    if (data.guests[i].name === guestName){
      index = i
    }
  }
  if (index === -1){
    return 'гость не найден'
  }
  data.guests.splice(index, 1)
  st.saveData(data)
  return 'гость удалён'
}
const listGuests = () => {
  const data = st.loadData()
  if (data.guests.length === 0){
    return 'гостей нет'
  }
  let text = 'Список гостей:\n'
  for (let i = 0; i < data.guests.length; i++){
    const guest = data.guests[i]
    text += `${i + 1}. ${guest.name} ${guest.email} ${guest.status}\n`
  }
  return text
}
const sendInvites = () => {
  const data = st.loadData()
  if (data.guests.length === 0){
    return 'гостей нет'
  }
  for (let i = 0; i < data.guests.length; i++){
    data.guests[i].status = 'отправлено'
  }
  st.saveData(data)
  return 'приглашения отправлены'
}
const updateGuestStatus = (guestName, status) => {
  const data = st.loadData()
  let guest = null
  for (let i = 0; i < data.guests.length; i++){
    if (data.guests[i].name === guestName){
      guest = data.guests[i]
    }
  }
  if (!guest){
    return 'гость не найден'
  }
  if (status === 'read' || status === 'прочитано'){
    guest.status = 'прочитано'
  } else if (status === 'yes' || status === 'подтверждено'){
    guest.status = 'подтверждено'
  } else if (status === 'no' || status === 'отклонено'){
    guest.status = 'отклонено'
  } else {
    return 'неверный статус'
  }
  st.saveData(data)
  return 'статус обновлён'
}
module.exports = {addGuest, removeGuest, listGuests, sendInvites, updateGuestStatus}
