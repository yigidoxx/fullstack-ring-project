const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRoute = require("./routes/products");

dotenv.config();
const app = express();

app.use(cors());
app.use("/products", productsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
