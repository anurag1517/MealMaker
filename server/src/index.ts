import express from"express"
import cors from"cors"
import dotenv from"dotenv"
import connectDB from"./config/db"
import recommendRoutes from"./routes/recommend"

const PORT=process.env.PORT||5000;

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/recommend",recommendRoutes)

connectDB();
app.listen(PORT,()=>console.log(`API ready on ${PORT}`));
