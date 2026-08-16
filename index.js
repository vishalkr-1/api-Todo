import express from 'express';
import dotenv from 'dotenv';
import router from './routes/tasks.router.js';
import connectDb from './config/db.js';
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(router)


connectDb()


app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})