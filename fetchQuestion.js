/**
 * 通过 leetcode 问题详情页 URL 拉取数据，生成文件模板
 */

const axios = require('axios');
const url = process.argv[2];
const fs = require('fs');

init(url);

async function init(url) {
  let title = url.match(/problems\/([^/]+)\//)[1];
  let res = await fetchData(title);
  let data = res.data.data.question;

  const fileMeta = {
    fileName: `${data.questionId}-${title}.js`,
    filePath: `./${data.difficulty.toLowerCase().replace('medium', 'middle')}/${data.questionId}-${title}.js`,
    query: {
      title,
      translatedTitle: data.translatedTitle,
      description: filterHTMLTag(data.translatedContent),
      tagName: genTagName(data.topicTags),
      code: getCodeSnippets('javascript', data.codeSnippets),
      date: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm')
    }
  };

  genFile(fileMeta);
  
}

function filterHTMLTag(str) {
  return ' * ' + str
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/\n/g, '\n * ');
}

function genTagName(tags) {
  return tags.map((item) => {
    return item.translatedName;
  }).join('、');
}

function getCodeSnippets(langSlug, snippets) {
  let code = '';
  snippets.forEach((item) => {
    if (item.langSlug === langSlug) {
      code = item.code.replace(/\\n/g, '\n');
    }
  });

  return code;
} 

function genFile(fileMeta) {
  if (fs.existsSync(fileMeta.filePath)) return console.log(`'${fileMeta.filePath}' 文件已经存在`);

  let template = fs.readFileSync('./question.template', { encoding: 'utf-8' });
  
  Object.keys(fileMeta.query).forEach((key) => {
    let reg = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(reg, fileMeta.query[key]);
  });

  fs.writeFileSync(fileMeta.filePath, template, { encoding: 'utf-8' });
  console.log(`'${fileMeta.filePath}' 生成成功`);
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

function fetchData(title) {

  return axios.request({
    method: 'POST',
    url: 'https://leetcode-cn.com/graphql/',
    headers: {
      'origin': 'https://leetcode-cn.com',
      'referer': url,
    },
    data: {
      operationName: 'questionData',
      query: `query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          boundTopicId
          title
          titleSlug
          content
          translatedTitle
          translatedContent
          isPaidOnly
          difficulty
          likes
          dislikes
          isLiked
          similarQuestions
          contributors {
            username
            profileUrl
            avatarUrl
            __typename
          }
          langToValidPlayground
          topicTags {
            name
            slug
            translatedName
            __typename
          }
          companyTagStats
          codeSnippets {
            lang
            langSlug
            code
            __typename
          }
          stats
          hints
          solution {
            id
            canSeeDetail
            __typename
          }
          status
          sampleTestCase
          metaData
          judgerAvailable
          judgeType
          mysqlSchemas
          enableRunCode
          envInfo
          book {
            id
            bookName
            pressName
            description
            bookImgUrl
            pressImgUrl
            productUrl
            __typename
          }
          isSubscribed
          __typename
        }
      }`,
      variables: {
        titleSlug: title
      }
    }
  });
}
