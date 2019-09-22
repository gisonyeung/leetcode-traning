const fs = require('fs');
const path = require('path');

let subjectInfos = {
  easy: traverseFiles(path.resolve(__dirname, 'easy/')),
  middle: traverseFiles(path.resolve(__dirname, 'middle/')),
  hard: traverseFiles(path.resolve(__dirname, 'hard/')),
};

writeToReadme([
  {
    placeholder: '{{list}}',
    content: genSubjectContent(subjectInfos)
  }
]);




/**
 * 同步遍历题目文件夹中的所有 js 文件，并解析内容生成对应数据结构
 * @param {String} dirPath
 * @return {Object} [{ fileName, url, name, tags, orderNums }, ...]
 */
function traverseFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  const res = [];

  files.forEach((filename) => {
    if (filename.indexOf('.js') == -1) return;
    
    let fileInfo = {
      fileName: filename,
      url: '',
      name: '',
      tags: [],
      orderNums: filename.match(/^\d+/)[0],
    };

    let filePath = path.resolve(dirPath, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 解析内容
    let url = content.match(/@url\s*([^\n]+)/);
    let name = content.match(/@name\s*([^\n]+)/);
    let tags = content.match(/@tags\s*([^\n]+)/);

    if (url) fileInfo.url = url[1];
    if (name) fileInfo.name = name[1];
    if (tags) fileInfo.tags = tags[1].split('、');

    res.push(fileInfo);
  });

  return res;
}

/**
 * 通过题目信息对象生成最终 md 文本
 * @param {Object} subjectInfos 
 * @return {String}
 * ```
 * 已刷题目总数：11
 * #### 简单(easy)
 * - 1.两数之和【tags|tags】: [查看代码](github link) [查看原题](leetcode link)
 * ```
 */
function genSubjectContent(subjectInfos) {

  let content = '';
  let count = 0;
  const levelMap = {
    'easy': '简单',
    'middle': '中等',
    'hard': '困难',
  };

  Object.keys(subjectInfos).forEach(level => {
    count += subjectInfos[level].length;
    let subContent = `\n**${levelMap[level]}(${level})**[${subjectInfos[level].length}]\n`;

    subjectInfos[level].forEach((s) => {
      let itemContent = `- ${s.orderNums}.${s.name}${s.tags.length ? `【${s.tags.join('|')}】` : ''}: [查看代码](https://github.com/gisonyeung/leetcode-traning/blob/master/${level}/${s.fileName}) [查看原题](${s.url})\n`;
      subContent += itemContent;
    });

    content += subContent;
  }); 

  content = `已刷题目总数：${count}\n${content}`;

  return content;
}

/**
 * 将文本写入 README
 * @param {Array} rules [{ placeholder, content }, ...]
 */
function writeToReadme(rules = []) {
  let template = fs.readFileSync(path.resolve(__dirname, 'README.template.md'), 'utf-8');

  rules.forEach(rule => {
    template = template.replace(rule.placeholder, rule.content);
  });

  fs.writeFileSync(path.resolve(__dirname, 'README.md'), template);
}