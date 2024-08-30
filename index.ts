import express from "express";
import { dbConnection } from "./database/dbConnection";
import { globalError } from "./src/middleware/globalError";
import authRouter from "./src/modules/auth/auth.routes";
import userRouter from "./src/modules/user/user.routes";
import postRouter from "./src/modules/posts/post.routes";
import commentRouter from "./src/modules/comment/comment.routes";
import likeRouter from "./src/modules/likes/like.routes";
const app = express();
const port = 3000;
dbConnection();

app.use(express.json());

app.use('/auth' , authRouter)
app.use('/users' , userRouter)
app.use('/posts' , postRouter)
app.use('/comments' , commentRouter)
app.use('/likes' , likeRouter)

app.use(globalError)

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
