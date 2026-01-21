const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple in-memory products (later you can move to DB)
const products = [
  {
    id: "tc-touch-a10",
    name: "TC-TOUCH-A10",
    tagline: "15.6 inch Touch POS",
    os: "Windows",
    cpu: "Intel Core i7",
    ram: "8GB",
    storage: "256GB SSD",
    desc: "Modern touch POS for small and medium business. Smooth billing and strong performance."
  },
  {
    id: "pos-pro-15",
    name: "Orange POS Pro 15",
    tagline: "All-in-one POS Terminal",
    os: "Windows / Android",
    cpu: "Core i5 / Octa-core",
    ram: "8GB / 4GB",
    storage: "256GB / 64GB",
    desc: "Reliable POS device with strong build, multiple ports, and fast printing support."
  },
  {
    id: "mini-pos-s10",
    name: "Mini POS S10",
    tagline: "Compact Counter POS",
    os: "Windows",
    cpu: "Intel",
    ram: "8GB",
    storage: "256GB SSD",
    desc: "Small size, clean look, perfect for cafés and small stores."
  }
];

// API: products list
app.get("/api/products", (req, res) => {
  res.json({ ok: true, products });
});

// API: product by id
app.get("/api/products/:id", (req, res) => {
  const item = products.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ ok: false, message: "Product not found" });
  res.json({ ok: true, product: item });
});

// API: contact (save to file)
app.post("/api/contact", (req, res) => {
  const { name, email, phone, topic, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Name, email and message are required" });
  }

  const record = {
    id: Date.now(),
    name, email,
    phone: phone || "",
    topic: topic || "General",
    message,
    createdAt: new Date().toISOString()
  };

  const file = path.join(__dirname, "contact_messages.json");
  let arr = [];
  if (fs.existsSync(file)) {
    try { arr = JSON.parse(fs.readFileSync(file, "utf8")); } catch { arr = []; }
  }
  arr.unshift(record);
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));

  res.json({ ok: true, message: "Message saved" });
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
