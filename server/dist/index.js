"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const vendors_json_1 = __importDefault(require("./vendors.json"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const vendors = vendors_json_1.default;
app.get("/api/vendors", (_req, res) => {
    return res.status(200).json({ vendors });
});
app.get("/api/vendors/:slug", (req, res) => {
    const { slug } = req.params;
    const vendor = vendors.find((v) => v.slug === slug);
    if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
    }
    return res.status(200).json({ vendor });
});
app.get("/api/vendors/:slug/items", (req, res) => {
    const { slug } = req.params;
    const vendor = vendors.find((v) => v.slug === slug);
    if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
    }
    return res.status(200).json({ items: vendor.items });
});
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
