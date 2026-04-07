import express from "express";
import { db } from "./db";
import cors from "cors";

import usersRouter from "./routes/users";
import skillsRouter from "./routes/skills";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/skills", skillsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
