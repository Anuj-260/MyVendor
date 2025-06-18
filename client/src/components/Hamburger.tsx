import React, { useState } from "react";

function VendorHamburger() {
  const [open, setOpen] = useState(false);

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
          src="https://placehold.co/100x50?text=Vendor+App"
          alt="Vendor"
          className="vendor-image"
        />
        <h2>Vendor App</h2>

        <div className="vendor-info">
          <div className="info-block">
            <strong>Opening Hours:</strong>
            <div>08:00 - 23:00 (CLOSED)</div>
          </div>
          <div className="info-block">
            <strong>Contact:</strong>
            <div>0455576728</div>
          </div>
          <div className="info-block">
            <strong>Address:</strong>
            <div>Nehru Place, New Delhi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorHamburger;
