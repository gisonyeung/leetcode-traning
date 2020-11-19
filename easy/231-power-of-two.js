/**
 * @name 2的幂
 * @url https://leetcode-cn.com/problems/power-of-two/
 * @date 2020-11-20 01:38
 * @tags 位运算、数学
 * @description
 * ```
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
 * 
 * 示例 1:
 * 
 * 输入: 1
 * 输出: true
 * 解释: 20 = 1
 * 
 * 示例 2:
 * 
 * 输入: 16
 * 输出: true
 * 解释: 24 = 16
 * 
 * 示例 3:
 * 
 * 输入: 218
 * 输出: false
 * 
 * ```
 */

/**
 * @param {number} n
 * @return {boolean}
 * 92ms 93.86%
 * 39.2mb 22.64%
 */
var isPowerOfTwo = function(n) {
  return n > 0 && (n & (-n)) === n;
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
  return n > 0 &&  (n & (n - 1)) === 0;
};

console.log(isPowerOfTwo());
console.log(isPowerOfTwo(5));

