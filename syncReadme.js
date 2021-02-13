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
  },
  {
    placeholder: '{{record}}',
    content: genRecordContent(subjectInfos)
  }
]);




/**
 * 同步遍历题目文件夹中的所有 js 文件，并解析内容生成对应数据结构
 * @param {String} dirPath
 * @return {Object} [{ fileName, url, name, tags, orderNums, isStar }, ...]
 */
function traverseFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  const res = [];

  files.forEach((filename) => {
    if (filename.indexOf('.js') === -1 && filename.indexOf('.cpp') === -1) return;
    
    let filePath = path.resolve(dirPath, filename);
    let content = fs.readFileSync(filePath, 'utf-8');
    let stats = fs.statSync(filePath);
    let fileInfo = {
      fileName: filename,
      url: '',
      name: '',
      tags: [],
      orderNums: filename.match(/^\d+/)[0],
      isStar: false,
      fileType: filename.match(/\.(\w+)$/)[1],
      date: dateFormat(stats.birthtimeMs, 'YYYY-MM-DD hh:mm')
    };

    

    // 解析内容
    let url = content.match(/@url\s*([^\n]+)/);
    let name = content.match(/@name\s*([^\n]+)/);
    let tags = content.match(/@tags\s*([^\n]+)/);
    let date = content.match(/@date\s*([^\n]+)/);

    if (url) fileInfo.url = url[1];
    if (name) fileInfo.name = name[1];
    if (tags) fileInfo.tags = tags[1].split('、');
    if (date) fileInfo.date = date[1];
    fileInfo.isStar = content.indexOf('@star') >= 0;

    res.push(fileInfo);
  });

  // 按照题号排序
  res.sort((a,b) => a.orderNums - b.orderNums);

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
      let itemContent = `- ${s.isStar ? '⭐' : ''}${s.orderNums}.${s.name}${s.fileType === 'cpp' ? '[c++]' : ''}${s.tags.length ? `【${s.tags.join('|')}】` : ''}: [查看代码](https://github.com/gisonyeung/leetcode-traning/blob/master/${level}/${s.fileName}) [查看原题](${s.url})\n`;
      subContent += itemContent;
    });

    content += subContent;
  }); 

  content = `已刷题目总数：${count}\n${content}`;

  return content;
}

/**
 * 通过题目信息对象生成最终 md 文本
 * @param {Object} subjectInfos 
 * @return {String}
 * ```
 * ### 2020-02-02 [1]
 * 1. 19:30：1.题目名称(easy) 
 * ```
 */
function genRecordContent(subjectInfos) {
  let content = '';
  let dateObj = {};

  Object.keys(subjectInfos).forEach(level => {
    subjectInfos[level].forEach((s) => {
      if (s.date) {
        let [date, time] = s.date.split(' ');
        let dateTimestamp = new Date(date).getTime() + '';
        // 扩展字段
        s.dateForDate = date;
        s.dateForTime = time;
        s.dateForSort = new Date(s.date).getTime();
        s.level = level;
        if (dateObj[dateTimestamp]) {
          dateObj[dateTimestamp].push(s);
        } else {
          dateObj[dateTimestamp] = [s];
        }
      }
    });
  }); 

  let dateObjKeys = Object.keys(dateObj);
  dateObjKeys.sort((a,b) => b-a);

  dateObjKeys.forEach((key) => {
    let subContent = `\n### ${dateObj[key][0].dateForDate} [${dateObj[key].length}]\n\n`;

    dateObj[key].sort((a,b) => a.dateForSort - b.dateForSort);
    dateObj[key].forEach((s,index) => {
      subContent += `${index + 1}. ${s.dateForTime}：${s.isStar ? '⭐' : ''}[${s.orderNums}.${s.name}](https://github.com/gisonyeung/leetcode-traning/blob/master/${s.level}/${s.fileName})(${s.level})\n`;
    });

    content += subContent;
  });

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

function dateFormat(dateString, fmt) {
  let _Date = new Date(dateString);

  let o = {
    'M+': _Date.getMonth() + 1, //月份 
    'D+': _Date.getDate(), //日 
    'h+': _Date.getHours(), //小时 
    'm+': _Date.getMinutes(), //分 
    's+': _Date.getSeconds(), //秒 
    'q+': Math.floor((_Date.getMonth() + 3) / 3), //季度 
    'S': _Date.getMilliseconds() //毫秒 
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_Date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    
  return fmt;
}