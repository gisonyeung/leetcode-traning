/**
 * @name 通配符匹配
 * @url https://leetcode-cn.com/problems/wildcard-matching/
 * @date 2020-01-27 18:17
 * @tags 贪心算法、字符串、动态规划、回溯算法
 * @star
 * @description
 * 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。
 * '?' 可以匹配任何单个字符。
 * '*' 可以匹配任意字符串（包括空字符串）。
 * 两个字符串完全匹配才算匹配成功。
 * 
 * @example
 * ```
 * 说明:
 * 
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
 * 
 * 示例 1:
 * 输入:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 * 
 * 示例 2:
 * 输入:
 * s = "aa"
 * p = "*"
 * 输出: true
 * 解释: '*' 可以匹配任意字符串。
 * 
 * 示例 3:
 * 输入:
 * s = "cb"
 * p = "?a"
 * 输出: false
 * 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
 * 
 * 示例 4:
 * 输入:
 * s = "adceb"
 * p = "*a*b"
 * 输出: true
 * 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
 * 
 * 示例 5:
 * 输入:
 * s = "acdcb"
 * p = "a*c?b"
 * 输入: false
 * ```
 * 
 * @summary
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 * 贪心算法 自顶向下
 * 100ms 98.71%
 * 38.8mb 85.40%
 */
var isMatch = function(s, p) {
  let i_star = -1, j_star = -1, i = 0, j = 0, n = s.length, m = p.length;
  while (i < n) {
    if (j !== m && (s[i] === p[j] || p[j] === '?')) ++i, ++j;
    else if (j !== m && p[j] === '*') i_star = i + 1, j_star = ++j;
    else if (j_star >= 0) i = i_star++, j = j_star;
    else return false;
  }
  while (j < m && p[j] === '*') ++j;
  return j === m;
};

isMatch('aa', 'a');
isMatch('abbc', 'a*c');