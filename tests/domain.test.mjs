import { test } from "node:test";
import assert from "node:assert/strict";
import { paletteFor } from "../src/domain.mjs";
test("exact pigment ranks first, non-paints excluded, invalid input rejected", () => {
  const p = [
    { id: "a", hex: "#ff0000" },
    { id: "b", hex: "#0000ff" },
    { id: "c", hex: "#ffffff" },
    { id: "brush" },
  ];
  assert.equal(paletteFor("#0000ff", p)[0].id, "b");
  assert.equal(paletteFor("#0000ff", p).length, 3);
  assert.throws(() => paletteFor("bad", p));
  assert.deepEqual(paletteFor("#000000", []), []);
});
