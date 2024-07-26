import { Router } from "express";
import {
  addRelationship,
  deleteRelationship,
  getRelationships,
} from "../controllers/relationship.js";

const relationRouter = Router();

relationRouter.get("/", getRelationships);
relationRouter.post("/add", addRelationship);
relationRouter.delete("/delete", deleteRelationship);

export default relationRouter;
