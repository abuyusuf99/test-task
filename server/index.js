const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use(require('./routes/User.route'))

mongoose.connect("mongodb+srv://Muslim:***Muslim95@cluster0.b4yowf9.mongodb.net/test")
.then(()=> console.log("Успешно"))
.catch(()=> console.log("Ошибка"))

app.listen(port, ()=>{
    console.log(`Сервер запущен на ${port}`);
})