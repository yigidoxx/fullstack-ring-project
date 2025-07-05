const express = require("express");
const router = express.Router();
const products = require("../data/products.json");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const goldRes = await axios.get("https://www.goldapi.io/api/XAU/USD/", {
      headers: {
        "x-access-token": process.env.GOLD_API_KEY,
        "Content-Type": "application/json"
      }
    });

    const goldPricePerGram = goldRes.data.price / 31.1035;

    const enriched = products.map((product) => {
      const price = (product.popularityScore + 1) * product.weight * goldPricePerGram;
      const popularityOutOfFive = +(product.popularityScore * 5).toFixed(1);
      return {
        ...product,
        price: +price.toFixed(2),
        popularity: popularityOutOfFive
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error("GoldAPI Error:", err.message);
    res.status(500).send("Failed to fetch gold price.");
  }
});

module.exports = router;
