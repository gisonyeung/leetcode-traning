/**
 * @name 有效的括号
 * @url https://leetcode-cn.com/problems/valid-parentheses/
 * @tags 栈、字符串
 * @description
 * ```
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 	左括号必须用相同类型的右括号闭合。
 * 	左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 * ```
 */

/**
 * @param {string} s
 * @return {boolean}
 * 64ms 76.92%
 * 33.7 90.40%
 */
var isValid = function(s) {
  let bracketMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] in bracketMap) {
      stack.push(s[i]);
    } else if (s[i] !== bracketMap[stack.pop()]) {
      return false;
    }
  }

  return !stack.length;
};

console.log(isValid('()[]{}'));
console.log(isValid('([)]'));