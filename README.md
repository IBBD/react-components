# 前端演示项目

## 贡献指引

参考：https://www.cnblogs.com/haomiao/p/11650324.html

## 初始化过程记录

```sh
yarn create react-app antd-demo
cd antd-demo
yarn start

yarn add antd

yarn add react-app-rewired customize-cra
```

vim package.json

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

vim config-overrides.js

```javascript
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

## babel-plugin-import

```sh
yarn add babel-plugin-import
```

vim config-overrides.js

```javascript
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```
