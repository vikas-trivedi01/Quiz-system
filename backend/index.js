import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on PORT: ${process.env.PORT}`);
    });
})
.catch((error) => {
     console.log("MONGO db connection failed while starting server", error);
})