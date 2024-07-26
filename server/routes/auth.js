import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/auth.js";

const authRoutes = Router();

authRoutes.get("/me", getMe);
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
