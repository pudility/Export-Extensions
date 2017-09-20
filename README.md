# Export Extensions
This babylon plugin adds a name to the default export so that you can see it in the stack trace.

## What it does
### Without plugin:
---
Input:
```js
export default () => {
    throw new Error('test');
};
```
Output:
```js
Error: test
    at exports.default
```
### With Pligin
---
Input:
```js
let baz = () => {
    throw new Error('test');
};

export default baz;
```
Output:
```js
Error: test
    at baz
```
As you can see, with the plugin it can show you where the issue is (in this case `at baz`).

## Testing
To see how the plugin works just run `npm start`, and if you want to compare how it works without the plugin, just run `npm test`.