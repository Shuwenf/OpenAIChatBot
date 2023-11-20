import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

import { fileURLToPath } from "url";

import { dirname, join } from "path";

dotenv.config();

const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(join(__dirname, "dist")));

app.get("/api", async (req, res) => {
  res.status(200).send({
    message:
      "Hello friends! The API server is up and running. This API was built by Viraj.",
  });
});

app.post("/api", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: req.body.prompt }],
    });

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
