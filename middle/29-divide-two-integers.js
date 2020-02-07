/**
 * @name 两数相除
 * @url https://leetcode-cn.com/problems/divide-two-integers/
 * @date 2020-02-07 13:59
 * @tags 数学、二分查找
 * @description
 * ```
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 * 
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 * 
 * 示例 1:
 * 
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 
 * 示例 2:
 * 
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 
 * 说明:
 * 
 * 
 * 	被除数和除数均为 32 位有符号整数。
 * 	除数不为 0。
 * 	假设我们的环境只能存储 32 位有符号整数，其数值范围是 [&minus;231,  231 &minus; 1]。本题中，如果除法结果溢出，则返回 231 &minus; 1。
 * 
 * 
 * ```
 */

let INT_MAX = 0x7FFFFFFF;
let INT_MIN = 1 << 31;

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 * 72ms 97.07%
 * 34.7mb 93.25%
 */
var divide = function(dividend, divisor) {
  // 判断符号，1 为负数，0 为正数
  let symbol = (dividend ^ divisor) >> 31;

  // 转化为负整数
  dividend = dividend > 0 ? -dividend : dividend;
  divisor = divisor > 0 ? -divisor : divisor;

  let times = binarySearchMatchDivisor(dividend, divisor);

  let output = 0;
  for (let i = 0; i < times.length; i++) {
    // times[i] === 31 表示 INT_MIN，times 无第二个元素，直接短路处理
    if (times[i] === 31) {
      return symbol ? INT_MIN : INT_MAX;
    }

    output += (1 << times[i]);
  }

  return symbol ? -output : output;
};

function binarySearchMatchDivisor(dividend, divisor) {
  if (divisor < dividend) {
    return [];
  }

  let timesMax = 32, timesMin = 0;

  // 二分查找
  while (timesMax !== timesMin + 1) {
    let mid = (timesMax + timesMin) >> 1;

    // 确保 divisor << mid > -1 << 31
    if (divisor < (-1 << (31 - mid))) {
      // 符合溢出条件
      timesMax = mid;
      continue;
    }

    // (a << y) <= b < (a << (y+1))
    if ((divisor << mid) < dividend) {
      timesMax = mid;
    } else {
      timesMin = mid;
    }
  }

  return [timesMin].concat(binarySearchMatchDivisor(dividend - (divisor << timesMin), divisor));
}


console.log(divide(10, 3));
console.log(divide(7, -3));
console.log(divide(100, 3));