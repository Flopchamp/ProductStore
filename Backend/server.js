import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';
import productRoutes from './routes/product_route.js'

dotenv.config();

 //allow us to accept JSON data into the req.body
const app = express();
const PORT =process.env.PORT || 5000;
const __dirname=path.resolve();

app.use(express.json()); 

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
})
}

// use the mongo url
//console.log(process.env.MONGO_URL);
app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:"+PORT);
});

//L3BdjvIvxy6AoPt9
//3NHmKY5FXimKNe3z