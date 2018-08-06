var esdoc = require('esdoc');
var buildMd = require('./parseJsonToMd.js');

module.exports = {
    /**
     * 初始化的时候生成 api 的专门文档
     * 根据代码的注释，生成md文件
     */
    init: async function(navObject) {
        // console.log(this.options);
        await esdoc.default.generate(this.options);
        await buildMd();
    }
};