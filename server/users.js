const { trimString } = require('./utils')

const users = []

const findUser = (user) => {
  const userName = trimString(user.name)
  const userRoom = trimString(user.room)

  return users.find(({ name, room }) =>
    trimString(name) === userName && trimString(room) === userRoom
  )
}

const addUser = (user) => {
  const userName = trimString(user.name)
  const userRoom = trimString(user.room)

  const isExist = users.some(({ name, room }) =>
    trimString(name) === userName && trimString(room) === userRoom
  )

  !isExist && users.push(user)

  return { isExist, user }
}

const getRoomUsers = (room) => users.filter((u) => u.room === room)

const removeUser = (user) => {
  const index = users.indexOf(user)
  users.splice(index, 1)

  return user
}

module.exports = { addUser, findUser, getRoomUsers, removeUser }