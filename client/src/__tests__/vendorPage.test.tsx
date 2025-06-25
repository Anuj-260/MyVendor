import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VendorPage from "../pages/vendorPage";
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        vendor: {
          slug: "test-vendor",
          name: "Test Vendor",
          logo: "/test-logo.png",
          items: [
            {
              id: 1,
              name: "Test Item",
              price: 100,
              image: "/test-item.jpg",
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe("VendorPage", () => {
  test("renders vendor details and menu item", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/vendor/test-vendor"]}>
          <Routes>
            <Route path="/vendor/:slug" element={<VendorPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for vendor data to load
    await waitFor(() => {
      expect(screen.getByText("Test Vendor")).toBeInTheDocument();
    });

    // Check menu item render
    expect(screen.getByText("Test Item")).toBeInTheDocument();

    // Check Proceed to Checkout button
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i })
    ).toBeInTheDocument();
  });

  test("shows error if vendor not found", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/vendor/invalid"]}>
          <Routes>
            <Route path="/vendor/:slug" element={<VendorPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Vendor Not Found")).toBeInTheDocument();
    });
  });

  test("navigates to checkout page on button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/vendor/test-vendor"]}>
          <Routes>
            <Route path="/vendor/:slug" element={<VendorPage />} />
            <Route path="/checkout" element={<div>Checkout Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Vendor")).toBeInTheDocument();
    });

    const checkoutBtn = screen.getByRole("button", {
      name: /proceed to checkout/i,
    });
    fireEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(screen.getByText("Checkout Page")).toBeInTheDocument();
    });
  });
});
