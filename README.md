# 前端演示项目

## 贡献指引

### 提交代码到上游仓库

- 1. Fork到自己的仓库
- 2. clone自己的仓库到本地
- 3. 修改......
- 4. commit & push 到自己的远程仓库
- 5. 点击“Pull requests”，然后点击绿色的按钮“New pull request”，然后就能看到代码变更记录，确认没问题，则可以填写说明之后提交

然后就可以等待合并了。

### 合并上游仓库代码

具体可以看[这里](https://zhuanlan.zhihu.com/p/291845721)。

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
