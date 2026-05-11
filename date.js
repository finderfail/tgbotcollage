const parseRusDate = (text) => {
  if (!text){
    return null
  }
  const parts = text.split('.')
  if (parts.length !== 3){
    return null
  }
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || isNaN(month) || isNaN(year)){
    return null
  }
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900){
    return null
  }
  const date = new Date(year, month - 1, day)
  if (date.toString() === 'Invalid Date'){
    return null
  }
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day){
    return null
  }
  return date
}
const formatRusDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const dd = day < 10 ? `0${day}` : `${day}`
  const mm = month < 10 ? `0${month}` : `${month}`
  return `${dd}.${mm}.${year}`
}
module.exports = {parseRusDate, formatRusDate}
