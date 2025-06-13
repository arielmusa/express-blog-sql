import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routers/router.js";
import { handleError } from "./middlewares/handleError.js";
import { notFound } from "./middlewares/notFound.js";

const app = express();
const { APP_HOST, APP_PORT } = process.env;

const url = `${APP_HOST}${APP_PORT ? ":" + APP_PORT : ""}`;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use("/posts", router);

app.use(handleError);
app.use(notFound);

app.listen(APP_PORT, () => {
  console.log(`Listening ${url}`);
});
