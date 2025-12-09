const express = require("express");
const router = express.Router();

const fallbackQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Act as if what you do makes a difference. It does.",
  "In the middle of difficulty lies opportunity."
];

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");

    let data;
    try {
      data = await response.json();
    } catch {
      data = null; // ZenQuotes sometimes fails to return JSON
    }

    if (Array.isArray(data) && data.length > 0 && data[0].q) {
      return res.json({
        quote: data[0].q,
        author: data[0].a || "Unknown"
      });
    }

    // If ZenQuotes failed silently or rate-limited → fallback
    console.warn("ZenQuotes returned invalid data, using fallback.");

    const random = Math.floor(Math.random() * fallbackQuotes.length);
    return res.json({
      quote: fallbackQuotes[random],
      author: "Unknown"
    });

  } catch (error) {
    console.error("ZenQuotes fetch failed completely:", error);

    const random = Math.floor(Math.random() * fallbackQuotes.length);
    res.json({
      quote: fallbackQuotes[random],
      author: "Unknown"
    });
  }
});

module.exports = router;
