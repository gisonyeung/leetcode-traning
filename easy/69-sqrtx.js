/**
 * @name x 的平方根
 * @url https://leetcode-cn.com/problems/sqrtx/
 * @date 2020-02-20 12:11
 * @tags 数学、二分查找
 * @description
 * ```
 * 实现 int sqrt(int x) 函数。
 * 
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 * 
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 * 
 * 示例 1:
 * 
 * 输入: 4
 * 输出: 2
 * 
 * 
 * 示例 2:
 * 
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842..., 
 *      由于返回类型是整数，小数部分将被舍去。
 * 
 * 
 * ```
 */

/**
 * @param {number} x
 * @return {number}
 * 84ms 74.88%
 * 35.9mb 32.84%
 */
var mySqrt = function(x) {
  if (x < 2) return x;

  let x0 = x;
  let x1 = (x0 + x / x0) / 2;

  while (Math.abs(x0 - x1) >= 1) {
    x0 = x1;
    x1 = (x0 + x / x0) / 2;
  }

  return Math.floor(x1);
};

console.log(mySqrt(4));
console.log(mySqrt(5));
console.log(mySqrt(9));