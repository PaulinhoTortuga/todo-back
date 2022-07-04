const Todos = require('../models/todosModel')
const { getPostData } = require('../utils')

const getTodos = async(req, res) => {
    try {
        const todos = await Todos.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(todos))
    } catch (error) {
        console.log(error)
    }
}

const createTodo = async (req, res) => {
    try {
        const body = await getPostData(req)
        const { value, checked } = JSON.parse(body)

        const todo = {
            value,
            checked
        }

        const newTodo = await Todos.create(todo)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newTodo))        

    } catch (error) {
        res.end({ 'message': error.message })
        console.log(error)
    }
}

const updateTodo = async (req, res) => {
    try {
        const id = req.url.split('/')[2]
        const todo = await Todos.findByID(id) 
        if (!todo) {
            res.writeHead(404, { 'Content-Type': 'aplication/json' })
            res.end(JSON.stringify({ message: 'Todo Not Found'}))
        } else {
            const body = await getPostData(req)
            console.log(body)
            const { value, checked } = JSON.parse(body)
    
            const todoData = {
                value: value || todo.value,
                checked: checked || todo.checked
            }
            const updTodo = await Todos.update(id, todoData)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updTodo))        
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.url.split('/')[2]
        const todo = await Todos.findByID(id) 
        if(!todo) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Todo Not Found' }))
        } else {
            await Todos.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Todo ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}