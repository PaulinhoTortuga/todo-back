const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://admin:0000@todoapp.pqegfjq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

module.exports = { 
    client
}


// const createTodo = async (client, newTodo) => {
//     const result = await client.db("todoDB").collection("todos").insertOne(newTodo)
// }

// const findAll = async (client) => {
//     return result = await client.db("todoDB").collection("todos").find({})
// }

// const update = async (client, todoId, updatedTodo) => {
//     await client.db("todoDB").collection("todos").updateOne({id: todoId}, {$set: updatedTodo})
// }

// const toggleAll = async (client, todoChecked) => {
//     await client.db("todoDB").collection("todos").updateMany({}, {$set: {checked: todoChecked}})
// }

// const remove = async (client, todoId) => {
//     await client.db("todoDB").collection("todos").deleteOne({id: todoId})
// }

// const deleteChecked = async (client) => {
//     await client.db("todoDB").collection("todos").deleteMany({checked: true})
// }