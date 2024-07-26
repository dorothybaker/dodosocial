import { Router } from "express";
import { addStory, getStories } from "../controllers/story.js";

const storyRoute = Router();

storyRoute.get("/", getStories);
storyRoute.post("/add", addStory);

export default storyRoute;
