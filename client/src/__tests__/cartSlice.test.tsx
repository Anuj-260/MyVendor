import cartReducer, {
  addToCart,
  updateQty,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { VendorItem } from "../types";

const testItem: VendorItem = {
  id: 1,
  name: "Burger",
  price: 100,
  image: "/burger.png",
};

describe("cartSlice", () => {
  test("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "@@INIT" })).toEqual([]);
  });

  test("should handle addToCart for new item", () => {
    const nextState = cartReducer([], addToCart(testItem));
    expect(nextState).toEqual([{ ...testItem, quantity: 1 }]);
  });

  test("should increment quantity if item already in cart", () => {
    const initialState = [{ ...testItem, quantity: 1 }];
    const nextState = cartReducer(initialState, addToCart(testItem));
    expect(nextState).toEqual([{ ...testItem, quantity: 2 }]);
  });

  test("should update quantity using updateQty", () => {
    const initialState = [{ ...testItem, quantity: 2 }];
    const nextState = cartReducer(
      initialState,
      updateQty({ id: 1, change: -1 })
    );
    expect(nextState).toEqual([{ ...testItem, quantity: 1 }]);
  });

  test("should remove item if quantity becomes 0", () => {
    const initialState = [{ ...testItem, quantity: 1 }];
    const nextState = cartReducer(
      initialState,
      updateQty({ id: 1, change: -1 })
    );
    expect(nextState).toEqual([]);
  });

  test("should remove item using removeFromCart", () => {
    const initialState = [{ ...testItem, quantity: 2 }];
    const nextState = cartReducer(initialState, removeFromCart(1));
    expect(nextState).toEqual([]);
  });
});
