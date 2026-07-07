import express from "express";
import cors from "cors";

const app = express();
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

  res.json({
    success: true,
    status: "processing",
    receivedUrl: url
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
