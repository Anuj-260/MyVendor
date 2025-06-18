import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import vendorsData from "./vendors.json";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

interface VendorItem {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface Vendor {
  id: number;
  slug: string;
  name: string;
  logo?: string;
  items: VendorItem[];
}

const vendors: Vendor[] = vendorsData as Vendor[];

app.get("/api/vendors", (_req: Request, res: Response) => {
  return res.status(200).json({ vendors });
});

app.get("/api/vendors/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  const vendor = vendors.find((v) => v.slug === slug);

  if (!vendor) {
    return res.status(404).json({ error: "Vendor not found" });
  }

  return res.status(200).json({ vendor });
});

app.get("/api/vendors/:slug/items", (req: Request, res: Response) => {
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
