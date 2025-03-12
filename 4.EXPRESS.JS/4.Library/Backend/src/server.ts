import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import pg, { Pool } from 'pg';
import { dot } from 'node:test/reporters';
import { ap } from '@faker-js/faker/dist/airline-CBNP41sR';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

// app.use((req, res, next) => {
//     req.pool = pool;
//     next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.get('/api/user_roles', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM user_roles');
        res.json(result.rows);
    } catch (error) {
        res
            .status(500)
    }
})


app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password,role_id } = req.body

        //check if email exists
        const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            })
            return
        }
        //insert the user 
        const userResult = await pool.query(
            "INSERT INTO users (name, email, password, role_id) VALUES($1, $2, $3, $4) RETURNING *", [name, email, password, role_id]
        )
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



//Get All users
app.get('/api/users', async (req, res) => {
    try {
        const
            result = await pool.query("SELECT * FROM users ORDER BY user_id ASC ")
        res.json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//Get single user
app.get('/api/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const
            result = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//update user
app.put('/api/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const { name, email, password, role_id } = req.body
        const
            result = await pool.query(
                "UPDATE users SET name = $1, email = $2, password = $3, role_id = $4 WHERE user_id = $5 RETURNING *", [name, email, password, role_id, user_id]
            )
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


// Update code using patch

// app.patch('/api/users/:user_id', async (req: Request, res: Response) => {
//     const client = await pool.connect();
//     try {
//         const { user_id } = req.params;
//         const { name, email, password, role_id } = req.body;
        
//         // Check if user exists first
//         const userCheck = await client.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
//         if (userCheck.rows.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Build dynamic update query based on provided fields
//         const updates = [];
//         const values = [];
//         let paramCount = 1;
        
//         if (name !== undefined) {
//             updates.push(`name = $${paramCount}`);
//             values.push(name);
//             paramCount++;
//         }
        
//         if (email !== undefined) {
//             updates.push(`email = $${paramCount}`);
//             values.push(email);
//             paramCount++;
//         }
        
//         if (password !== undefined) {
//             // Hash password before storing
//             const hashedPassword = await bcrypt.hash(password, 10);
//             updates.push(`password = $${paramCount}`);
//             values.push(hashedPassword);
//             paramCount++;
//         }
        
//         if (role_id !== undefined) {
//             updates.push(`role_id = $${paramCount}`);
//             values.push(role_id);
//             paramCount++;
//         }
        
//         // If no updates provided
//         if (updates.length === 0) {
//             return res.status(400).json({ message: "No update data provided" });
//         }
        
//         // Add user_id as the last parameter
//         values.push(user_id);
        
//         // Execute update query
//         const result = await client.query(
//             `UPDATE users SET ${updates.join(', ')} WHERE user_id = $${paramCount} RETURNING user_id, name, email, role_id`,
//             values
//         );
        
//         res.json({
//             message: "User successfully updated",
//             user: result.rows[0]
//         });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     } finally {
//         client.release();
//     }
// });


//delete user
app.delete('/api/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const
            result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [user_id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json({ message: "User deleted" })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})  


// // Login
// app.post('/api/login', async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { email, password } = req.body;
        
//         // Validate inputs
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }
        
//         const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        
//         if (result.rows.length === 0) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
        
//         const user = result.rows[0];
//         const passwordMatch = await bcrypt.compare(password, user.password);
        
//         if (!passwordMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
        
//         // Don't include password in response
//         const { password: _, ...userWithoutPassword } = user;
        
//         // Here you would typically generate a JWT token
//         // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         res.json({ 
//             message: "Login successful", 
//             user: userWithoutPassword,
//             // token: token
//         });
//     } catch (error) {
//         console.error("Error authenticating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     } finally {
//         client.release();
//     }
// });


// // Logout
// app.post('/api/logout', (req, res) => {
//     // Here you would typically invalidate the JWT token
//     res.json({ message: "Logout successful" });
// });




//Book routes

//create book
app.post("/api/books", async (req: Request, res: Response) => {
    try {
        const { book_id } = req.params
        const { title, author, genre, year, pages, price, publisher, description, image, created_by } = req.body;

        // First, dynamically verify the book exists:
        const bookCheck = await pool.query(
            "SELECT book_id FROM books WHERE book_id = $1",
            [book_id]
        );

        if (bookCheck.rows.length > 0) {
            res.status(400).json({ message: "Book exists" });
            return
        }

        // Proceed to create book
        const bookResult = await pool.query(
            `INSERT INTO books(title, author, genre,year,pages,price,publisher,description,image,created_by) 
             VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10) RETURNING *`,
            [title, author, genre, year, pages, price, publisher, description, image, created_by]
        );

        res.status(201).json({
            message: "Book created successfully",
            event: bookResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Error handling
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});