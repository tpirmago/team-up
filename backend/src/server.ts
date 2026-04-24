import express from "express";
import { db } from "./db";
import cors from "cors";

import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import skillsRouter from "./routes/skills";
import projectsRouter from "./routes/projects";
import interestsRouter from "./routes/interests";
import notificationsRouter from "./routes/notifications";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/skills", skillsRouter);
app.use("/projects", projectsRouter);
app.use("/interests", interestsRouter);
app.use("/notifications", notificationsRouter)
app.use("/avatars", express.static("public/avatars"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
