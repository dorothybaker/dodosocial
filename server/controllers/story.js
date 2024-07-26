import jwt from "jsonwebtoken";
import moment from "moment";
import { connectToDb } from "../utils/connect.js";

export const getStories = (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json("Not logged in!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token!");

    // GETTING STORIES FRO THOSE YOU FOLLOW
    // `SELECT s.*, username, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.storyUserId)
    // LEFT JOIN relationships AS r ON (s.storyUserId = r.followedUserId AND r.followerUserId= ?) ORDER BY createdAt DESC LIMIT 4`

    const query = `SELECT s.*, username, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.storyUserId) ORDER BY createdAt DESC LIMIT 4 `;

    connectToDb.query(query, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addStory = (req, res) => {
  const { accessToken } = req.cookies;
  const { image } = req.body;
  if (!accessToken) return res.status(401).json("Not logged in!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token!");

    const q =
      "INSERT INTO stories(`storyImg`, `createdAt`, `storyUserId`) VALUES (?)";
    const values = [
      image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    connectToDb.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been created.");
    });
  });
};
