import React, { useState } from "react";
import { Vendor } from "../types";

type Props = { Vendor: Vendor };

function VendorHamburger({ Vendor }: Props) {
  const [open, setOpen] = useState(false);
  console.log(Vendor);
  return (
    <div>
      <div className="hamburger-icon" onClick={() => setOpen(true)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`side-panel ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          X
        </button>
        <img
          src={Vendor.logo || "https://placehold.co/200x150?text=vendor+123"}
          alt={Vendor.name}
          className="vendor-image"
        />
        <h2>{Vendor.name}</h2>

        <div className="vendor-info">
          <div className="info-block">
            <strong>Opening Hours:</strong>
            <div>08:00 - 23:00 (CLOSED)</div>
          </div>
          <div className="info-block">
            <strong>Contact:</strong>
            <div>{Vendor.contact}</div>
          </div>
          <div className="info-block">
            <strong>Address:</strong>
            <div>{Vendor.Address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorHamburger;
