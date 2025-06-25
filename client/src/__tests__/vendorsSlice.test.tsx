import vendorsReducer, {
  fetchVendorsRequest,
  fetchVendorsSuccess,
  fetchVendorsFailure,
} from "../redux/slices/vendorsSlice";
import { Vendor } from "../types";

const dummyVendors: Vendor[] = [
  {
    slug: "pizza-hut",
    name: "Pizza Hut",
    logo: "/pizza.png",
    items: [],
  },
];

describe("vendorsSlice", () => {
  test("should return the initial state", () => {
    expect(vendorsReducer(undefined, { type: "@@INIT" })).toEqual({
      list: [],
      status: "idle",
    });
  });

  test("should handle fetchVendorsRequest", () => {
    const nextState = vendorsReducer(undefined, fetchVendorsRequest());
    expect(nextState.status).toBe("loading");
    expect(nextState.list).toEqual([]);
  });

  test("should handle fetchVendorsSuccess", () => {
    const nextState = vendorsReducer(
      { list: [], status: "loading" },
      fetchVendorsSuccess(dummyVendors)
    );
    expect(nextState.status).toBe("succeeded");
    expect(nextState.list).toEqual(dummyVendors);
  });

  test("should handle fetchVendorsFailure", () => {
    const nextState = vendorsReducer(
      { list: [], status: "loading" },
      fetchVendorsFailure()
    );
    expect(nextState.status).toBe("failed");
    expect(nextState.list).toEqual([]);
  });
});
