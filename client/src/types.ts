export interface VendorItem {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export interface Vendor {
  slug: string;
  name: string;
  logo?: string;
  items: VendorItem[];
  contact: string;
  Address: string;
}
