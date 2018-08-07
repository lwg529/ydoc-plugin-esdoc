## ydoc-plugin-esdoc
根据代码生成注释，丰富的插件满足你的需要。

## 用法
在项目目录下 install 插件：

`npm install ydoc-plugin-esdoc`

在项目根目录 ydoc.js 中配置插件参数, .esdoc.json中的配置放在这里即可：

```
module.exports = {
    plugins: ['esdoc'],
    pluginsConfig: {
        esdoc: {
        source: "./yis-js",
        destination: "./docs/api",
        plugins: [
            { name: "esdoc-standard-plugin" },
            { name: "esdoc-ecmascript-proposal-plugin", option: { all: true } },
            { name: "esdoc-jsx-plugin", option: { enable: true } },
            { name: "esdoc-flow-type-plugin", option: { enable: true } }
        ]
        }
    },
    markdownIt: function(md) {
        md.use(require("markdown-it-include"), __dirname);
    }
}
```
## esdoc 参考

esdoc-feature: https://esdoc.org/manual/feature.html

esdoc: https://github.com/esdoc/esdoc

esdoc-plugins: https://github.com/esdoc/esdoc-plugins
