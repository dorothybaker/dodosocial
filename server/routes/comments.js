import { Router } from "express";
import { addComment, deleteComment, getPosts } from "../controllers/comment.js";

const commentRoutes = Router();

commentRoutes.get("/", getPosts);
commentRoutes.post("/comment", addComment);
commentRoutes.delete("/delete/:id", deleteComment);

export default commentRoutes;
