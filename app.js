import express from "express";
import authRotue from './routes/auth.route.js'
const app = express()

app.use(express.json())

app.use('/api/auth',authRotue);

app.listen(8000, () => {
    console.log("Server running on 8000");
})
