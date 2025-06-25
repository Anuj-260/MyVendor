import { render, screen, fireEvent } from "@testing-library/react";
import MenuItem from "../components/menuItem";
import { VendorItem } from "../types";

describe("MenuItem component", () => {
  const mockItem: VendorItem = {
    id: 1,
    name: "Test Item",
    price: 100,
    image: "https://test.com/image.jpg",
  };

  const mockOnAdd = jest.fn();

  test("renders item details correctly", () => {
    render(<MenuItem item={mockItem} onAdd={mockOnAdd} />);

    // Check for image
    const img = screen.getByAltText("Test Item") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://test.com/image.jpg");

    // Check for name
    expect(screen.getByText("Test Item")).toBeInTheDocument();

    // Check for price
    expect(screen.getByText("₹100")).toBeInTheDocument();

    // Check for button
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  test("calls onAdd when Add to Cart button is clicked", () => {
    render(<MenuItem item={mockItem} onAdd={mockOnAdd} />);

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(mockItem);
  });
});
