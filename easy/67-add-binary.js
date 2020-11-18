/**
 * @name 二进制求和
 * @url https://leetcode-cn.com/problems/add-binary/
 * @date 2020-11-19 00:58
 * @tags 数学、字符串
 * @description
 * ```
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 * 
 * 输入为 非空 字符串且只包含数字 1 和 0。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 
 * 示例 2:
 * 
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 * 
 *  
 * 
 * 提示：
 * 
 * 
 * 	每个字符串仅由字符 '0' 或 '1' 组成。
 * 	1 <= a.length, b.length <= 10^4
 * 	字符串如果不是 "0" ，就都不含前导零。
 * 
 * 
 * ```
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * 会溢出
 */
var addBinary = function(a, b) {
  let x = parseInt(a, 2);
  let y = parseInt(b, 2);

  while (y) {
    let answer = x ^ y;
    let carry = (x & y) << 1;

    x = answer;
    y = carry;
  }

  return x.toString(2);
};

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * 80ms 96.13%
 * 40mb 18.96%
 */
var addBinary = function(a,b) {
  let ans = '';
  let carry = 0;

  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = carry;
    sum += (i >= 0) ? parseInt(a[i]) : 0;
    sum += (j >= 0) ? parseInt(b[j]) : 0;
    ans = sum % 2 + ans;
    carry = Math.floor(sum / 2);
  }

  if (carry === 1) {
    ans = carry + ans;
  }
  
  return ans;
};

console.log(addBinary('1001', '1010'));
console.log(addBinary('10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101', '110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011'));