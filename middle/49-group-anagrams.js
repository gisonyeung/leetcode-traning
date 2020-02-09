/**
 * @name 字母异位词分组
 * @url https://leetcode-cn.com/problems/group-anagrams/
 * @date 2020-02-10 00:21
 * @tags 哈希表、字符串
 * @star
 * @description
 * ```
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 * 
 * 示例:
 * 
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * 输出:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 * 
 * 说明：
 * 
 * 
 * 	所有输入均为小写字母。
 * 	不考虑答案输出的顺序。
 * 
 * 
 * ```
 * 
 * @summary
 * 用质数乘法代替散列，妙
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 * 132ms 93.67%
 * 45.4mb 60.94%
 */
var groupAnagrams = function(strs) {
  let ansMap = {};
  let keyArr = null, keyStr = '';

  for (let i = 0; i < strs.length; i++) {
    let word = strs[i];
    keyArr = new Array(26).fill(0);

    for (let k = 0; k < word.length; k++) {
      keyArr[word[k].charCodeAt() - 97]++;
    }

    keyStr = keyArr.join('');

    if (ansMap[keyStr]) {
      ansMap[keyStr].push(word);
    } else {
      ansMap[keyStr] = [word];
    }
  }

  let ans = [];
  for (let key in ansMap) {
    ans.push(ansMap[key]);
  }

  return ans;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 * 120ms 98.83%
 * 45mb 85.04%
 */
var groupAnagrams = function(strs) {
  let map = {};
  let arr = [];
  let alphaBet = {
    a:1,
    b:3,
    c:5,
    d:7,
    e:11,
    f:13,
    g:17,
    h:19,
    i:23,
    j:29,
    k:31,
    l:37,
    m:41,
    n:43,
    o:47,
    p:53,
    q:59,
    r:61,
    s:67,
    t:71,
    u:73,
    v:79,
    w:83,
    x:89,
    y:97,
    z:101,
  };

  function getCharcodeMultiple(str) {
    let multiple = 1;
    for(let i = 0;i < str.length; i++) {
      multiple *= alphaBet[str[i]];
    }
    return multiple;
  }

  for(let i = 0;i < strs.length; i++) {
    let index = getCharcodeMultiple(strs[i]);
    if(map[index]) {
      map[index].push(strs[i]);
    }else{
      map[index] = [strs[i]]; 
    }
  }

  for(let key in map) {
    arr.push(map[key]);
  }
  return arr;
};

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
console.log(groupAnagrams(['eat']));
console.log(groupAnagrams([]));