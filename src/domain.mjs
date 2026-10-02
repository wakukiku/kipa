function rgb(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error("Invalid color");
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
// Weighted distance in sRGB: useful for palette browsing, not physical pigment mixing.
export function paletteFor(hex, products) {
  const a = rgb(hex);
  return products
    .filter((p) => p.hex)
    .map((p) => {
      const b = rgb(p.hex);
      return {
        p,
        d:
          2 * (a[0] - b[0]) ** 2 +
          4 * (a[1] - b[1]) ** 2 +
          3 * (a[2] - b[2]) ** 2,
      };
    })
    .sort((x, y) => x.d - y.d)
    .slice(0, 3)
    .map((x) => x.p);
}
