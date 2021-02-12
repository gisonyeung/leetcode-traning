/**
 * @name 最长有效括号
 * @url https://leetcode-cn.com/problems/longest-valid-parentheses/
 * @date 2020-01-05 13:05
 * @tags 字符串、动态规划
 * @star
 * @description
 * 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
 * 
 * @example
 * ```
 * 示例 1:
 * 输入: "(()"
 * 输出: 2
 * 解释: 最长有效括号子串为 "()"
 * 
 * 示例 2:
 * 输入: ")()())"
 * 输出: 4
 * 解释: 最长有效括号子串为 "()()"
 * ```
 * 
 * @summary
 */

/**
 * @param {string} s
 * @return {number} 
 * 64ms 96.78%
 * 36.3mb 62.86%
 */
var longestValidParentheses = function(s) {
  let res = 0;
  const dp = new Array(s.length).fill(0);

  for (let i = 1; i < s.length; i++) {
    if (s[i] == ')') {
      if (s[i-1] == '(') {
        dp[i] = (i >=2 ? dp[i-2] : 0) + 2; 
      } else if (i - dp[i-1] > 0 && s[i - dp[i-1] - 1] == '(') {
        // for case '(())'
        dp[i] = dp[i-1] + ((i - dp[i-1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
      }

      res = Math.max(res, dp[i]);
    }
  }

  return res;
};

/**
 * @param {string} s
 * @return {number} 
 * 64ms 96.78%
 * 36.6mb 60.00%
 */
var longestValidParentheses = function(s) {
  let res = 0;
  const stack = [-1];

  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (!stack.length) {
        stack.push(i);
      } else {
        res = Math.max(res, i - stack[stack.length - 1]);
      }
    }
  }

  return res;
};

/**
 * @param {string} s
 * @return {number} 
 * 60ms 99.20%
 * 35.6mb 94.29%
 */
var longestValidParentheses = function(s) {
  let left = 0, right = 0, res = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') {
      left++;
    } else {
      right++;
    }

    if (left == right) {
      res = Math.max(res, left + right);
    } else if (right >= left) {
      left = right = 0;
    }
  }

  left = right = 0;

  for (let j = s.length -1 ; j >= 0; j--) {
    if (s[j] == '(') {
      left++;
    } else {
      right++;
    }

    if (left == right) {
      res = Math.max(res, left + right);
    } else if (left >= right) {
      left = right = 0;
    }
  }

  return res;
};


longestValidParentheses('(()');
longestValidParentheses('(()()');
longestValidParentheses(')(()()');
longestValidParentheses(')()())');
longestValidParentheses('()(())');
longestValidParentheses('(())()');
longestValidParentheses('(()()(())((');
longestValidParentheses(')()(((())))(');
longestValidParentheses(')()((((())())))(');