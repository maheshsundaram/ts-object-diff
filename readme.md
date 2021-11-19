Output the changes from object `left` to object `right` using the following rules:

1. If a property is in `right` and not `left`, include it in the result.
2. If a property has changed type from `left` to `right`, include it in the result.
3. If a property is missing from `right`, omit it from the result.
4. If a property is Array-like and any item in the array from `left` has changed in `right`, include the entire array in the result.

Built on Deno `1.16.x`

`npm install typescript@4.4 && npx tsc` will build a CommonJS and ESModule compatible JS file.
