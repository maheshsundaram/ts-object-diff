const StringType = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1);

type Primitive = string | number | null | boolean | undefined;

const isPrimitive = (value: unknown): value is Primitive =>
  ["String", "Number", "Null", "Boolean", "Undefined"].includes(
    StringType(value),
  );

type ArrayLike = (Primitive | ObjectLike | ArrayLike)[];

const isArrayLike = (value: unknown): value is ArrayLike =>
  StringType(value) === "Array";

type ObjectLike = {
  [k: string]: Primitive | ArrayLike | ObjectLike;
};

const isObjectLike = (value: unknown): value is ObjectLike =>
  StringType(value) === "Object";

/*
 * Return true if a and b are different arrays.
 */
const compareArrays = (a: ArrayLike, b: ArrayLike): boolean => {
  if (a.length !== b.length) {
    return true;
  }
  let diff = false;
  for (let i = 0; i < b.length; i++) {
    const aValue = a[i];
    const bValue = b[i];

    if (StringType(aValue) !== StringType(bValue)) {
      diff = true;
      break;
    }

    if (isPrimitive(aValue) && isPrimitive(bValue)) {
      if (aValue !== bValue) {
        diff = true;
        break;
      }
    }

    if (isArrayLike(aValue) && isArrayLike(bValue)) {
      return compareArrays(aValue, bValue);
    }

    if (isObjectLike(aValue) && isObjectLike(bValue)) {
      const o = difference(aValue, bValue);
      if (Object.keys(o).length > 0) {
        diff = true;
        break;
      }
    }
  }

  return diff;
};

/*
 * Return what has changed in right from left.
 */
export const difference = (
  left: ObjectLike,
  right: ObjectLike,
): ObjectLike => {
  const result = Object.keys(right).reduce((memo, key) => {
    const leftVal = left[key];
    const rightVal = right[key];

    if (StringType(leftVal) !== StringType(rightVal)) memo[key] = rightVal;

    if (isPrimitive(rightVal) && isPrimitive(leftVal)) {
      if (rightVal !== leftVal) memo[key] = rightVal;
    }

    if (isArrayLike(rightVal) && isArrayLike(leftVal)) {
      const diff = compareArrays(leftVal, rightVal);
      if (diff) memo[key] = rightVal;
    }

    if (isObjectLike(rightVal) && isObjectLike(leftVal)) {
      const o = difference(rightVal, leftVal);
      if (Object.keys(o).length > 0) {
        memo[key] = rightVal;
      }
    }

    return memo;
  }, {} as ObjectLike);

  return result;
};
