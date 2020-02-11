/**
 * @name 加一
 * @url https://leetcode-cn.com/problems/plus-one/
 * @date 2020-02-11 20:50
 * @tags 数组
 * @description
 * ```
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,3]
 * 输出: [1,2,4]
 * 解释: 输入数组表示数字 123。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [4,3,2,1]
 * 输出: [4,3,2,2]
 * 解释: 输入数组表示数字 4321。
 * 
 * 
 * ```
 */

/**
 * @param {number[]} digits
 * @return {number[]}
 * 64ms 74.32%
 * 33.7mb 71.97%
 */
var plusOne = function(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i]++;
    digits[i] = digits[i] % 10;
    if (digits[i] !== 0) return digits;
  }

  return [1].concat(digits);
};

console.log(plusOne([4,3,2,1]));
console.log(plusOne([4,3,2,9]));