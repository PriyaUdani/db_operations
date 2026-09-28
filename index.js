import express from "express";

import db from "./db.js"

const app = express();
const port = 3000;

app.use(express.json());

//Select
app.get("/products" , (req,res)=>{
    //database fetch operation perform here....
        db.query("select * from products" , (err , result)=>{
        if(err)
        {
            res.json({
                message : Fail,
                data : err.message
            });
        }

        res.json({message:'Products List' , data: result});

    });
});

//insert
app.post("/products/store" , (req , res)=>{
    //1st Way...
    // db.query("insert into products set ?" , req.body , (err , result)=>{
    //     if(err)
    //     {
    //         res.json({
    //             message : "Fail",
    //             data : err.message
    //         });
    //     }

    //     res.json({message:'Products List' , data: result.insertId});
    // });

    //2nd Way
    db.query("insert into products (name , category , price) values (?,?,?)" , [req.body.name , req.body.category , req.body.price] , (err , result)=>{
        if(err)
        {
            res.json({
                message : Fail,
                data : err.message
            });
        }

        res.json({message:'Products List' , data: result.insertId});
    });

});


//update
app.put("/products/:id" , (req , res)=>{
    db.query("update products set ? where id = ?" , [req.body , req.params.id] , (err , result)=>{
        if(err)
        {
            res.json({
                message : Fail,
                data : err.message
            });
        }

        res.json({message:'Products List' , data: result.affectedRows});
    });
});

//delete
app.delete("/products/:id" , (req , res)=>{
    db.query("delete from products where id = ?" , req.params.id , (err , result)=>{
        if(err)
        {
            res.json({
                message : Fail,
                data : err.message
            });
        }

        res.json({message:'Products List' , data: result.affectedRows});
    });
});

app.listen(port , ()=>{
    console.log(`sever is running on http://localhost:${port}`);
});