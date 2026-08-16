import express from 'express'
import { addTask, deleteTask, getTasks, updateTask } from '../controller/tasks.controllers.js'
const router = express.Router()

router.get('/', getTasks)
router.post('/add-task', addTask)
router.patch('/update-task', updateTask)
router.delete('/delete-task/:id',deleteTask)
export default router