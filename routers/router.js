import express from "express";
import "dotenv/config";
import { posts } from "../data/posts.js";
import {
  index,
  show,
  store,
  update,
  modify,
  destroy,
} from "../controllers/postsController.js";

const router = express.Router();
const { APP_HOST, APP_PORT } = process.env;
const url = `${APP_HOST}${APP_PORT ? ":" + APP_PORT : ""}`;

// FIX image url for all posts
posts.forEach((item) => {
  item.image = url + item.image;
});

// INDEX
router.get("", index);

// SHOW
router.get("/:id", show);

// STORE
router.post("", store);

// UPDATE
router.put("/:id", update);

// MODIFY
router.patch("/:id", modify);

// DESTROY
router.delete("/:id", destroy);

export { router };
