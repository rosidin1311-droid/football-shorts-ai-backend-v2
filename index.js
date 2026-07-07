import crypto from "crypto";
import express from "express";
import cors from "cors";

const app = express();
const jobs = new Map();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Football Shorts AI Backend V2"
  });
});

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "YouTube URL wajib diisi."
    });
  }

  const jobId = crypto.randomUUID();

  jobs.set(jobId, {
    id: jobId,
    url,
    status: "queued",
    createdAt: new Date().toISOString()
  });

  console.log({
    success: true,
    jobId,
    status: "queued"
  });

  res.json({
    success: true,
    jobId,
    status: "queued"
  });
});

app.get("/job/:jobId", (req, res) => {
  const job = jobs.get(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job tidak ditemukan"
    });
  }

  res.json(job);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
