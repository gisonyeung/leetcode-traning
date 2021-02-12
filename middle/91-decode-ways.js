/**
 * @name 解码方法
 * @url https://leetcode-cn.com/problems/decode-ways/
 * @date 2020-01-30 19:06
 * @tags 字符串、动态规划
 * @description
 * ```
 * 一条包含字母 A-Z 的消息通过以下方式进行了编码：
 * 
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 * 
 * 
 * 给定一个只包含数字的非空字符串，请计算解码方法的总数。
 * 
 * 示例 1:
 * 
 * 输入: "12"
 * 输出: 2
 * 解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
 * 
 * 
 * 示例 2:
 * 
 * 输入: "226"
 * 输出: 3
 * 解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 * ```
 * 
 * @summary
 * 避免循环中出现大量隐式类型转换，可以提升运行效率，如下`temp`变量与`s[i] !== '0`的存在，使平均运行时间提升了 12ms
 */

/**
 * @param {string} s
 * @return {number}
 * 60ms 96.75%
 * 34.9mb 56.27%
 */
var numDecodings = function(s) {
  let pp = 0, p = 1, cur = s[0] == 0 ? 0 : 1, temp = 0;

  for (let i = 1; i < s.length; i++) {
    pp = p;
    p = cur;
    temp = parseInt(s[i-1] + s[i], 10);

    cur = (temp >= 10 && temp <= 26 ? pp : 0) + (s[i] !== '0' ? p : 0); 

    if (cur == 0) return 0;
  }

  return cur;
};

console.log(numDecodings('226'));
console.log(numDecodings('227'));
console.log(numDecodings('2207'));
console.log(numDecodings('0'));
console.log(numDecodings('01'));
console.log(numDecodings('101'));