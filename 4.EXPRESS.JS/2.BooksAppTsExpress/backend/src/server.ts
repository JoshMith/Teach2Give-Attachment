import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import fs from 'fs'
import path from 'path'
import cors from "cors"
import exp from "constants"

//configure the dotenv 
//top most level
dotenv.config()

//instance of express
//the second most top level
const app = express()

//load the variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port) //3000
console.log(secret) //a_very_strong_secret_for_you


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())





//get the current  directory
const _dirname = path.resolve()

let booksData: Book[] = [];

//synchronously read the file
const filePath=path.join(_dirname, "src", "db", "booksData.json")
const booksContent = fs.readFileSync(filePath, "utf-8")
booksData= JSON.parse(booksContent)

console.log(booksData)


interface Book {
    id: number;
    title:string;
    genre: string;
    author: string;
    pages: number;
    publisher: string;
    description: string;
    price: number;
    image: string;
}




//a simple get request saying hello world
app.get('/', (req, res) => {
    res.send(`Hello World, Be humble to us`)
})

app.get('/api/books', (req, res) => {
    res.send(booksData)
})


//Now, let's create a GET API route that filters events based on query parameters
app.get('/api/booksFilter', (req: Request, res: Response) => {
    try {
        const { genre } = req.query

        //on the first filters, the whole evets havent been filtered
        let filteredEvents = [...booksData]

        //filtering logic
        if (genre && genre !== "all") {
            filteredEvents = filteredEvents.filter((book) => book.genre === genre)
        }

        res.json(filteredEvents)
    } catch (error) {
        console.error(error);
    }
})

// create server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn