import { Router } from "express";
import { addPost, deletePost, getPosts } from "../controllers/post.js";

const postRoutes = Router();

postRoutes.get("/", getPosts);
postRoutes.post("/post", addPost);
postRoutes.delete("/delete/:id", deletePost);

export default postRoutes;
