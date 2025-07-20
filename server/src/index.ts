import express from"express"
import cors from"cors"
import dotenv from"dotenv"
import connectDB from"./config/db"
import recommendRoutes from"./routes/recommend"

const PORT=5000;


dotenv.config()
const app=express()
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://meal-maker-lyart.vercel.app", 
    ],
  })
);
app.use(express.json())
app.use("/api/recommend",recommendRoutes)

connectDB();
app.listen(PORT,()=>console.log(`API ready on ${PORT}`));
