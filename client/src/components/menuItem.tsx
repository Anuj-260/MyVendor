import React from "react";
import { VendorItem } from "../types";

interface MenuItemProps {
  item: VendorItem;
  onAdd: (item: VendorItem) => void;
}

function MenuItem({ item, onAdd }: MenuItemProps) {
  return (
    <div className="menu-item">
      <img
        src={item.image || "https://placehold.co/100"}
        alt={item.name}
        className="item-image"
      />
      <h3 className="item-name">{item.name}</h3>
      <p className="item-price">₹{item.price}</p>
      <button className="add-to-cart" onClick={() => onAdd(item)}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuItem;
