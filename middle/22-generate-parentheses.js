/**
 * @url https://leetcode-cn.com/problems/generate-parentheses/
 * @tags 字符串、回溯算法
 * @description
 * 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
 * 
 * @example
 * ```
 * 例如，给出 n = 3，生成结果为：
 * [
 *   "((()))",
 *   "(()())",
 *   "(())()",
 *   "()(())",
 *   "()()()"
 * ]
 * ```
 * 
 * @summary
 * 
 */

var backtrackGenarate = function(ans, cur, open, close, max) {
  if (cur.length == max * 2) {
    return ans.push(cur);
  }

  if (open < max) {
    backtrackGenarate(ans, cur + '(', open + 1, close, max);
  }

  if (close < open) {
    backtrackGenarate(ans, cur + ')', open, close + 1, max);
  }
};

/**
 * @param {number} n
 * @return {string[]}
 * 60ms 99.86%
 * 35.1mb 35.03%
 */
var generateParenthesis = function(n) {
  let ans = [];
  backtrackGenarate(ans, '', 0, 0, n);

  // console.log('生成序列', ans);
  return ans;
};

generateParenthesis(3);