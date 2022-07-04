let todos = require('../data/todos')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(todos)
    })
}

const findByID = id => {
    return new Promise((resolve, reject) => {
        const todo = todos.find(item => item.id === id)
        resolve(todo)
    })
}

const create = todo => {
    return new Promise((resolve, reject) => {
        const newTodo = {id: uuidv4() , ...todo}
        todos.push(newTodo)
        writeDataToFile('./data/todos.json', todos)
        resolve(newTodo)
    })
}

const update = (id, todo) => {
    return new Promise((resolve, reject) => {
        const index = todos.findIndex(item => item.id === id)
        todos[index] = {id, ...todo}
        writeDataToFile('./data/todos.json', todos)
        resolve(todos[index])
    })
}

const remove = id => {
    return new Promise((resolve, reject) => {
        todos = todos.filter(item => item.id !== id)
        writeDataToFile('./data/todos.json', todos)
        resolve()
    })
}

module.exports = { 
    findAll,
    findByID,
    create,
    update,
    remove
}
