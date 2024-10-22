import "dotenv/config.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { PostgresHelper } from "./src/database/postgres/helper.js";

const app = express();

app.get("/", async (req, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users;");
  res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log("Listening on port 3000"));
