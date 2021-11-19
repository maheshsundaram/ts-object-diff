import { assertEquals } from "https://deno.land/std@0.115.1/testing/asserts.ts";
import { difference } from "./object-diff.ts";

Deno.test({
  name: "diff 1",
  fn() {
    const left = {
      x: 100,
      y: 200,
    };

    const right = {
      x: 100,
      y: [1, 2],
      z: "50",
    };

    const expected = {
      y: [1, 2],
      z: "50",
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 2",
  fn() {
    const left = {
      x: 100,
      y: [1, 2],
    };

    const right = {
      x: 100,
      y: [1, 2, 3],
    };

    const expected = {
      y: [1, 2, 3],
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 3",
  fn() {
    const left = {
      x: 100,
      y: [{ value: 1 }, { value: 2 }],
    };

    const right = {
      x: 100,
      y: [{ value: 100 }, { value: 200 }],
    };

    const expected = {
      y: [{ value: 100 }, { value: 200 }],
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 4",
  fn() {
    const left = {
      x: 100,
      y: {
        value_a: 100,
        value_b: 200,
      },
    };

    const right = {
      x: 100,
      y: {
        value_a: 100,
      },
    };

    const expected = {
      y: {
        value_a: 100,
      },
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 5",
  fn() {
    const left = {
      x: 100,
      y: [[1, 2], [3, 4]],
    };

    const right = {
      x: 100,
      y: [[3, 4]],
    };

    const expected = {
      y: [[3, 4]],
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 6",
  fn() {
    const left = {
      x: 100,
      y: [1, 2, 3, 4],
    };

    const right = {
      x: 100,
      y: [1, 2, 3, { value: 4 }],
    };

    const expected = {
      y: [1, 2, 3, { value: 4 }],
    };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 7",
  fn() {
    const left = {};

    const right = {};

    const expected = {};

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 8",
  fn() {
    const left = { a: 100 };

    const right = { b: 200 };

    const expected = { b: 200 };

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 9",
  fn() {
    const left = { a: undefined };

    const right = { a: undefined };

    const expected = {};

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});

Deno.test({
  name: "diff 10",
  fn() {
    const left = { a: 100 };

    const right = { a: 100 };

    const expected = {};

    const result = difference(left, right);

    assertEquals(result, expected);
  },
});
