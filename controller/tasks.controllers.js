import mongoose from "mongoose";
import tasks from "../models/tasks.models.js";
export const getTasks = async(req,res) => {
    try {
           const data = await tasks.find();
        if (data?.length == 0) {
          return res.status(404).send('tasks not found')
        }
   
    res.status(200).send(data)
    } catch (err) {
        
        res.status(500).send({
            message:err.message
        })
    }
}

export const addTask = async (req, res) => {
    try {
      
        if (req.body.taskname) {
            const newTask=  await tasks.create({
            task_name: req.body.taskname,
            start_Date: new Date(),
            
            })
            return res.status(201).send({
            message: 'new Task added successfully',
            data:newTask
        })
        } 
            return res.status(400).send('no task added')
        
      
        
       

    } catch (err) {
        console.log(err)
        res.status(500).send(`server error ${err}`)
    }
}


export const updateTask = async (req,res) => {
    try {
        const taskId = req.body.id;
        const status = req.body.status
         const taskname=req.body.taskname
        let taskItem = {
            status:status
        };
   
        
          if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
            return res.status(400).send({
                message: "Invalid task ID"
            });
        }

        if (req.body.status === 'completed') {
            taskItem.completed_Date=new Date()
            
        }
        if (req.body.status === 'in-progress') {
            taskItem.completed_Date=new Date()
            
        }

         if (req.body.taskname) {
            taskItem.task_name=taskname
            
        }
     
      
          taskItem = await tasks.findByIdAndUpdate(taskId,taskItem, { new: true })
            
        
          res.status(200).send({
            message: 'task updated successfully',
            task:taskItem
        })

       
    } catch (err) {
          res.status(500).send({
            message:err.message
        })
  }





}


export const deleteTask = async (req, res) => {
  
    
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).send({
                message: "Invalid task ID"
            });
    }

    const item = await tasks.findByIdAndDelete(req.params.id)
     
        if (!item) {
          return  res.status(404).send({
                 message:'no task found for this id'
             })
        }
        res.status(200).json({
            message:'task deleted'
        })
        
        
    } catch (err) {
        res.status(500).send('server error',err)
  }

    
}