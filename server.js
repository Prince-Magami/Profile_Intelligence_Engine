require("dotenv").config();

const express=require("express");
const cors=require("cors");

const connectDB=require("./db");

const profileRoutes=
require("./routes/profiles");

const app=express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
 res.json({
   status:"success",
   message:"Intelligence Query Engine running"
 });
});

app.use("/api/profiles",profileRoutes);

const PORT=
process.env.PORT || 8080;

app.listen(PORT,()=>{
 console.log(
  `Server running on ${PORT}`
 );
});