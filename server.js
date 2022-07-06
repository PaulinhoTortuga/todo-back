const http = require('http');
const { getTodos, createTodo, updateTodo, deleteTodo, toggleAll, deleteChecked } = require('./controllers/todosController')

const server = http.createServer((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else if (req.url === '/todos' && req.method === 'GET') {
        getTodos(req, res)
    } else if (req.url === '/todos' && req.method === 'POST') {
        createTodo(req, res)
    } else if (req.url.match(/\/todos\/\w+/) && req.method === 'PUT') {
        updateTodo(req, res)
    } else if (req.url.match(/\/todos\/\w+/) && req.method === 'DELETE') {
        deleteTodo(req, res)
    } else if (req.url === '/todos' && req.method === 'PUT') {
        toggleAll(req, res)
    } else if (req.url === '/todos' && req.method === 'DELETE') {
       deleteChecked (req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({messsage: 'Not Found'}))
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))