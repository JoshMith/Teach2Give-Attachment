import express,{ Request,Response, NextFunction} from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { readFileSync } from "fs"
import { error } from "console"
// import { events } from "./src/events.ts"

//configure the dotenv
dotenv.config()

//instance of express
const app = express()

//load the env variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port);//3000
console.log(secret);



// Enable CORS - Cross Origin Resources
app.use(cors(
    // origin: "http://localhost:5173/", // Allow frontend requests from this origin
    // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    // credentials: true // Allow cookies and authentication headers
));

// app.use(express.json());



//get the current directory
const _dirname = path.resolve()
let booksData: any[] = []
// synchronously read the file
try{
    const data = readFileSync(
        path.join(_dirname, "src", "db", "booksData.json"), "utf-8"
        // booksData = JSON.parse(data); // Parse JSON safely

    )
}catch{
    console.error("Error reading books data:", error);
}

// console.log(booksData)

// Sample Route
app.get("/", (req, res) => {
    res.send("CORS is enabled!");
});




app.get('/api/books', (req, res) => {
    res.send(booksData)
})


app.post('/api/books',(req, res) =>{
    res.send("success")
})



// const parsedData = JSON.parse(booksData)


app.get('/api/bookFilters', (req: Request, res:Response) => {
    try{
        const {genre, name, id} = req.query

        let filteredBooks = booksData
        
        // Filter by Genre
        if (genre) {
            filteredBooks = filteredBooks.filter((book: any) =>
                book.genre.toLowerCase().includes((genre as string).toLowerCase())
            );
        }

        // Filter by Name
        if (name) {
            filteredBooks = filteredBooks.filter((book: any) =>
                book.title.toLowerCase().includes((name as string).toLowerCase())
            );
        }

        // Filter by ID (Ensure ID is treated as a number)
        if (id) {
            filteredBooks = filteredBooks.filter((book: any) => book.id === Number(id));
        }

        res.json(filteredBooks);
    }catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ error: "Server error" });
    }
})



// app.get('/api/books/:genre/:id', (req, res) => {
//     const {genre,id} = req.params
//     res.send(`Genre: ${genre}, Book id: ${id}`)
// })


//create server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


