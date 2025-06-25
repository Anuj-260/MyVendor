import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Assign only if not already present
if (typeof globalThis.TextEncoder === "undefined") {
  Object.assign(globalThis, {
    TextEncoder: TextEncoder,
  });
}

if (typeof globalThis.TextDecoder === "undefined") {
  Object.assign(globalThis, {
    TextDecoder: TextDecoder,
  });
}
