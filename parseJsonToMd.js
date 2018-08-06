var fs = require('fs');
var path = require('path');

function buildParam(params) {
    var paramMD = [];
    var requiredParam = [];
    var optionalParam = [];

    paramMD.push('| 参数名 | 类型 | 必选 | 默认值 | 描述 |\n');
    paramMD.push('| ----- | ----- | ----- | ----- | ----- |\n');

    params.forEach(function(param) {
        if (param.optional) {
            optionalParam.push('| ');
            optionalParam.push(
                [
                    param.name,
                    param.types.join(','),
                    param.optional ? '×' : '√',
                    typeof param.defaultValue === 'undefined' ? '无' : param.defaultValue,
                    param.description
                ].join(' | ')
            );
            optionalParam.push(' |\n');
        } else {
            requiredParam.push('| ');
            requiredParam.push(
                [
                    param.name,
                    param.types.join(','),
                    param.optional ? '×' : '√',
                    typeof param.defaultValue === 'undefined' ? '无' : param.defaultValue,
                    param.description
                ].join(' | ')
            );
            requiredParam.push(' |\n');
        }
    });

    paramMD.push(requiredParam.join(''));
    paramMD.push(optionalParam.join(''));

    return paramMD.join('');
}

function buildMdContent(api) {
    var content = [];
    
    if (api.since) {
        content.push('## ' + api.name + ' >= '+ api.since + '\n');
    } else {
        content.push('## ' + api.name + '\n');
    }
    
    if (api.description) {
        content.push('\n' + api.description + '\n');
    }

    

    if (api.see && api.see.length) {
        content.push('\n' + '详情请参照：');

        api.see.forEach(function(link) {
            content.push('<a target="_blank" href="' + link + '">这里</a>');
        });

        content.push('\n\n');
    }

    content.push('### 参数\n\n');
    content.push(buildParam(api.params));
    content.push('\n\n');

    if (api.examples && api.examples.length) {
        content.push('### 示例\n\n');

        api.examples.forEach(function(example) {
            content.push('```javascript\n');
            content.push(example + '\n');
            content.push('```\n');
        });
    }

    return content.join('');
}

function buildMd () {
    // 从配置文件中生成json的路径
    var esdocParh = path.join(__dirname, './.esdoc.json');
    var esdocJson = JSON.parse(fs.readFileSync(esdocParh, 'utf-8'));
    var docsPath = path.join(__dirname, esdocJson.destination);
    // 读取生成的json文件
    var jsonPath = path.join(docsPath, './index.json');
    var jsonFile = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    // 生成docs的文件夹
    var mdDocsPath = path.join(__dirname, './docs');
    if(!fs.existsSync(mdDocsPath)) {
        fs.mkdirSync(mdDocsPath)
        // console.log('------', mdDocsPath);
    }
    var mdPathFile = {};
    jsonFile.forEach(function(item) {
        if(item.kind === 'function' || item.kind === 'class'){
            
            if (item.params && item.params.length) {
                // 从json中获取fileName和methodName
                var fileName = item.memberof.match(/([^\/]*)\.js$/)[1];
                // console.log('fileName-----', fileName);
                var methodName = item.name;
                // 生成文件写入md文件
                var content = buildMdContent(item);
                var methodMdPath = path.join(
                    __dirname,
                    './docs/' + fileName + '_' + methodName + '.md'
                );
                fs.writeFileSync(methodMdPath, content);
                // fileName中写入mdPathFile文件的路径
                mdPathFile[fileName] = mdPathFile[fileName] || [];
                mdPathFile[fileName].push(
                    'docs/' + fileName + '_' + methodName + '.md'
                );
                console.log('file', mdPathFile);
            }
        }
    });
    for (var item in mdPathFile) {
        var filePath = path.join(__dirname, './docs/' + item + '.md');
        if (!fs.existsSync(filePath)) {
            var content = [];
            content.push('# ' + item + '\n');
            console.log('file item', mdPathFile[item]);
            mdPathFile[item].forEach(function(_file) {
                content.push('!!!include(' + _file + ')!!!\n\n');
            });
            fs.writeFileSync(filePath, content.join(''));
            console.log('生成 ' + filePath);
        }
    }

}
// buildMd()
module.exports = buildMd;
