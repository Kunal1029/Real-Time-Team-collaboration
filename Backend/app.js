import express from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connectDB/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
const port = process.env.PORT || 3000;
import cors from "cors"

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React app
  credentials: true,
}));

app.use("/api/user", userRouter)
app.use("/api/team", teamRouter)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at port ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})

