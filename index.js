import express from 'express';
import dotenv from 'dotenv';
import router from './routes/tasks.router.js';
import connectDb from './config/db.js';
import dns from "dns";
import cors from "cors";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();
const app = express()
app.use(
  cors({
    origin: ["https://works-todo-game.netlify.app/","http://localhost:5173"],
  })
);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(router)

const startServer = async () => {
  try {
    await connectDb(); // wait for Mongo to actually connect
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB, server not started:', err);
    process.exit(1);
  }
};

startServer();