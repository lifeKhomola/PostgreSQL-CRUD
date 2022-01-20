const express = require("express");
const app = express();
//allows us to run quirys on this pool
//to delete and update
const pool = require("./db")
// access the body...req.body
app.use(express.json()); 

//routes

//get all todos

//get a todo
//create a todo

app.post("/todos", async(req,res)=>{
    try {
        //await waits for something before
        //it continues
        const {description} = req.body;
        const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING ",[description]);
        // console.log(req.body)
        res.json(newTodo);
        console.log(req.body)
    } 
    catch {

    }
        
   
})
//update a todo
//delete a todo


const PORT = 4000;

app.listen(PORT,() =>{
    console.log("Serve is listening on port 3000");
});