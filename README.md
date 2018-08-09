## ydoc-plugin-esdoc
根据代码生成md文件，丰富的插件满足你的需要。

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

## 支持的参数

名称 | 参数解释
---|---
@param| 参数，@param <type> <name> [-] [description]，name为[]则不是必选参数
@return | 返回值类型和描述
@see | 详情，链接到其他页面
@example | 示例 
@desc | 描述 
@ignore| 忽略的注释
@version | 开始支持的版本