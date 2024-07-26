import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.js";

const userRoutes = Router();

userRoutes.get("/find/:userId", getUser);
userRoutes.put("/update", updateUser);

export default userRoutes;
