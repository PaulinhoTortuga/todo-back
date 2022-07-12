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

const update = (id, todoData) => {
    return new Promise((resolve, reject) => {
        const newTodos = todos.map(item => {
           return id === item.id ? {...item, ...todoData} : item
        })
        const index = newTodos.findIndex(item => item.id === id)
        // todos[index] = {id, ...todo}
        writeDataToFile('./data/todos.json', newTodos)
        resolve(newTodos[index])
    })
}

const remove = id => {
    return new Promise((resolve, reject) => {
        todos = todos.filter(item => item.id !== id)
        writeDataToFile('./data/todos.json', todos)
        resolve()
    })
}

const toggleAll = () => {
    return new Promise((resolve, reject) => {
        let uncheckedTodos = todos.filter(item => item.checked === false)
        if(uncheckedTodos.length !== 0) {
            todos = todos.map(item => {
                item.checked = true;
                return item
            })
        } else {
            todos = todos.map(item => {
                item.checked = false;
                return item
            })
        }
        writeDataToFile('./data/todos.json', todos)
        resolve(todos)
    })
}

const deleteChecked = () => {
    return new Promise((resolve, reject) => {
        todos = todos.filter(item => item.checked === false)
        writeDataToFile('./data/todos.json', todos)
        resolve(todos)
    })

}

module.exports = { 
    findAll,
    findByID,
    create,
    update,
    remove,
    toggleAll,
    deleteChecked
}
