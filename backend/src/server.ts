import express from "express";
import { db } from "./db";
import cors from "cors";
import usersRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.get("/test", async (req, res) => {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
