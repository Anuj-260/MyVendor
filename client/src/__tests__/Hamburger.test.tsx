import React from "react";
import { render, fireEvent } from "@testing-library/react";
import VendorHamburger from "../components/Hamburger";

describe("VendorHamburger component", () => {
  test("side panel is initially closed", () => {
    const { container } = render(<VendorHamburger />);
    const sidePanel = container.querySelector(".side-panel")!;
    expect(sidePanel.classList.contains("open")).toBe(false);
  });

  test("opens side panel on hamburger click", () => {
    const { container } = render(<VendorHamburger />);
    const hamburgerIcon = container.querySelector(".hamburger-icon")!;
    const sidePanel = container.querySelector(".side-panel")!;

    fireEvent.click(hamburgerIcon);
    expect(sidePanel.classList.contains("open")).toBe(true);
  });

  test("closes side panel on close button click", () => {
    const { container } = render(<VendorHamburger />);
    const hamburgerIcon = container.querySelector(".hamburger-icon")!;
    const sidePanel = container.querySelector(".side-panel")!;
    const closeBtn = container.querySelector(".close-btn")!;

    fireEvent.click(hamburgerIcon);
    expect(sidePanel.classList.contains("open")).toBe(true);

    fireEvent.click(closeBtn);
    expect(sidePanel.classList.contains("open")).toBe(false);
  });
});
