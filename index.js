const express = require("express");
const app = express();
//allows us to run quirys on this pool
//to delete and update
const pool = require("./db")
// access the body...req.body
app.use(express.json()); 

//routes

//get all todos
app.get("/todos",async (req,res) =>{
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo
app.get("/todos/:id", async (req,res)=>{
    const {id} =req.params;
    try {
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",[id]
            )
            res.json(todo.rows[0])
        
    } catch (err) {
        console.error(err)
    }

});
//create a todo

app.post("/todos", async(req,res)=>{
    try {
        //await waits for something before
        //it continues
        const {description} = req.body;
        const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        // console.log(req.body)
        res.json(newTodo.rows[0]);
        
    } 
    catch (err) {
        console.error(err.message)
    }
        
//    0636290747
})
//update a todo
app.put("/todos/:id", async (req,res) =>{
    try {
        const {id} = req.params;   //where
        const {description} = req.body; //set

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description,id]
            )

            res.json("Todo was updated!")
    } catch (err) {
        console.error(err.message)
        
    }
})
//delete a todo 

app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1 ",[id]
            )
            res.json("Todo was successfully deleted!")
        
    } catch (err) {
        console.error(err.message)
    }
})


const PORT = 4000;

app.listen(PORT,() =>{
    console.log("Serve is listening on port 3000");
});