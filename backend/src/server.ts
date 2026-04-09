import express from "express";
import { db } from "./db";
import cors from "cors";

import usersRouter from "./routes/users";
import skillsRouter from "./routes/skills";
import projectsRouter from "./routes/projects";
import interestsRouter from "./routes/interests";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/skills", skillsRouter);
app.use("/projects", projectsRouter);
app.use("/interests", interestsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
