const Todos = require('../models/todosModel')
const client = require('../data/mongo')
const { getPostData } = require('../utils')

const getTodos = async (req, res) => {
    client.connect()
    try {
        const todos = await client.db("todoDB").collection("todos").find({})
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(todos))
    } catch (error) {
        console.log(error)
    }
}

const createTodo = async (req, res) => {
    try {
        getPostData(req, async ({ value, checked }) => {
            const todo = {
              value,
              checked,
            };
            const newTodo = await client.db("todoDB").collection("todos").insertOne(todo);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(newTodo));
            res.end();
          });     

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
            getPostData(req, async todoData => {
                const updTodo = client.db("todoDB").collection("todos").updateOne({id: id}, {$set: todoData});
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(updTodo));
                res.end();
              });
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
            client.db("todoDB").collection("todos").deleteOne({id: id})
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Todo ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggleAll = async (req, res) => {
    try {
        const todos = await Todos.toggleAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(todos))
    } catch (error) {
        console.log(error)
    }
}

const deleteChecked = async (req, res) => {
    try {
        const todos = await client.db("todoDB").collection("todos").deleteMany({checked: true})

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(todos))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo, 
    toggleAll,
    deleteChecked
}