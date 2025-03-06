import express from "express"
import dotenv from "dotenv"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"


//configure the dotenv
//top-most level
dotenv.config()

//instance of express
//second top-most level
const app = express()

//load the variables
const port = process.env.PORT
console.log(port);//3000

//create server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})



//a simple get request saying hello world
app.get('/', (req, res) => {
    res.send('Hello world, Be humble to us')
})


//enable CORS for all origins
//app.use(cors())

// enable cors with Option(RECOMMENDED)
// to allow only http://localhost:5173
app.use(cors({
    origin: 'http://:localhost:5173', // Allow all origins
    methods: 'GET, PUT, DELETE', // Allow specific HTTP methods
    credentials: true // Allow cookies and auth headers
}))

//get the current directory
const _dirname = path.resolve()

// synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)



app.get('/api/events', (req, res) => {
    res.send(eventData)
})
console.log(eventData)
