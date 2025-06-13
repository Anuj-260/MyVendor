const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let vendors = require("./vendors.json");

// Routes

// ✅ GET: All vendors (summary)
app.get("/api/vendors", (req, res) => {
  res.status(200).json({ vendors });
});

// ✅ GET: Single vendor by slug (full data)
app.get("/api/vendors/:slug", (req, res) => {
  const { slug } = req.params;
  const vendor = vendors.find((v) => v.slug === slug);

  if (!vendor) {
    return res.status(404).json({ error: "Vendor not found" });
  }

  res.status(200).json({ vendor });
});

// ✅ GET: Items only of a specific vendor
app.get("/api/vendors/:slug/items", (req, res) => {
  const { slug } = req.params;
  const vendor = vendors.find((v) => v.slug === slug);

  if (!vendor) {
    return res.status(404).json({ error: "Vendor not found" });
  }

  res.status(200).json({ items: vendor.items });
});

app.listen(PORT, () => console.log(`Server Started at port:${PORT}`));
