import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

const renderWithStore = (store: any) => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
};

describe("HomePage", () => {
  it("renders loading state", () => {
    const store = mockStore({
      vendors: {
        list: [],
        status: "loading",
      },
    });

    renderWithStore(store);

    expect(screen.getByText(/Loading vendors.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    const store = mockStore({
      vendors: {
        list: [],
        status: "failed",
      },
    });

    renderWithStore(store);

    expect(screen.getByText(/Error loading vendors/i)).toBeInTheDocument();
  });

  it("renders no vendors found state", () => {
    const store = mockStore({
      vendors: {
        list: [],
        status: "succeeded",
      },
    });

    renderWithStore(store);

    expect(screen.getByText(/No vendors found/i)).toBeInTheDocument();
  });

  it("renders vendors list when succeeded", () => {
    const store = mockStore({
      vendors: {
        list: [
          { slug: "vendor-1", name: "Vendor 1", logo: "" },
          { slug: "vendor-2", name: "Vendor 2", logo: "" },
        ],
        status: "succeeded",
      },
    });

    renderWithStore(store);

    expect(screen.getByText("Vendor 1")).toBeInTheDocument();
    expect(screen.getByText("Vendor 2")).toBeInTheDocument();
  });
});
