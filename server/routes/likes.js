import { Router } from "express";
import { addLike, deleteLike, getLikes } from "../controllers/like.js";

const likeRoutes = Router();

likeRoutes.get("/", getLikes);
likeRoutes.post("/like", addLike);
likeRoutes.delete("/delete", deleteLike);

export default likeRoutes;
