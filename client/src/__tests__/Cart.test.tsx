import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../components/cart";
import { VendorItem } from "../types";

describe("Cart component", () => {
  const sampleCart: (VendorItem & { quantity: number })[] = [
    { id: 1, name: "Item A", price: 100, quantity: 2 },
    { id: 2, name: "Item B", price: 50, quantity: 1 },
  ];

  const setup = (cart = sampleCart) => {
    const onUpdateQty = jest.fn();
    const onRemove = jest.fn();
    const onTotalChange = jest.fn();

    render(
      <Cart
        cart={cart}
        onUpdateQty={onUpdateQty}
        onRemove={onRemove}
        onTotalChange={onTotalChange}
      />
    );

    return { onUpdateQty, onRemove, onTotalChange };
  };

  test("renders cart items and total", () => {
    setup();

    // Check item names
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();

    // Check total
    expect(screen.getByText("Total: ₹250")).toBeInTheDocument();

    // Check cart badge quantity
    expect(screen.getByText("3")).toBeInTheDocument(); // 2 + 1
  });

  test("calls onUpdateQty when buttons clicked", () => {
    const { onUpdateQty } = setup();

    // Click plus button of Item A
    fireEvent.click(screen.getAllByText("+")[0]);
    expect(onUpdateQty).toHaveBeenCalledWith(1, 1);

    // Click minus button of Item A
    fireEvent.click(screen.getAllByText("-")[0]);
    expect(onUpdateQty).toHaveBeenCalledWith(1, -1);
  });

  test("calls onRemove when remove button clicked", () => {
    const { onRemove } = setup();

    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  test("shows message when cart is empty", () => {
    setup([]);

    expect(screen.getByText("No items in cart")).toBeInTheDocument();
  });

  test("calls onTotalChange with correct total", () => {
    const { onTotalChange } = setup();

    // onTotalChange should have been called with 250 (100*2 + 50*1)
    expect(onTotalChange).toHaveBeenCalledWith(250);
  });
});
