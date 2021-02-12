/**
 * @name 电话号码的字母组合
 * @url https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
 * @date 2020-02-02 15:01
 * @tags 字符串、回溯算法
 * @description
 * ```
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * 
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * 
 * ```
 */

/**
 * @param {string} digits
 * @return {string[]}
 * 48ms 99.01%
 * 33.7% 55.06%
 */
var letterCombinations = function(digits) {

  let res = [];

  if (digits.length) {
    backtracks(res, '', digits);
  }
  
  return res;
};

let letterMap = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};
function backtracks (res, combination, rest_digits) {
  if (!rest_digits.length) return res.push(combination);

  let digit = rest_digits.substring(0,1);
  let letters = letterMap[digit];

  for (let i = 0; i < letters.length; i++) {
    backtracks(res, combination + letters[i], rest_digits.substring(1));
  }
}

console.log(letterCombinations('23'));