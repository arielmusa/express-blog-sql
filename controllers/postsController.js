import { posts } from "../data/posts.js";

const index = (req, res) => {
  const queryTag = req.query.tags;

  let filteredPosts = posts;

  if (queryTag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.includes(queryTag)
    );
  }

  if (filteredPosts.length === 0) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(filteredPosts);
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({
      error: "Not found",
      message: "Item not found",
    });
  }
  res.json(post);
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body;
  console.log(req.body);
  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }

  const newPost = { id: ++maxId, title, content, image, tags };
  posts.push(newPost);
  res.status(201).json(newPost);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  const { title, content, image, tags } = req.body;
  if (!post) {
    return res.status(404).json({
      error: "Not found",
      message: "Item not found",
    });
  }
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.image = image ?? post.image;
  post.tags = tags ?? post.tags;
  res.json(post);
};

const modify = (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({
      error: "Not found",
      message: "Item not found",
    });
  }
  res.send(`Modifica post id: ${id}`);
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Eliminazione post id: ${id}`);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({
      error: "Not found",
      message: "Item not found",
    });
  }
  posts.splice(posts.indexOf(post), 1);
  res.sendStatus(204);
};
export { index, show, store, update, modify, destroy };
