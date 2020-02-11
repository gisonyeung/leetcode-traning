/**
 * @name Pow(x, n)
 * @url https://leetcode-cn.com/problems/powx-n/
 * @date 2020-02-10 01:05
 * @tags 数学、二分查找
 * @description
 * ```
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 * 
 * 示例 1:
 * 
 * 输入: 2.00000, 10
 * 输出: 1024.00000
 * 
 * 
 * 示例 2:
 * 
 * 输入: 2.10000, 3
 * 输出: 9.26100
 * 
 * 
 * 示例 3:
 * 
 * 输入: 2.00000, -2
 * 输出: 0.25000
 * 解释: 2-2 = 1/22 = 1/4 = 0.25
 * 
 * 说明:
 * 
 * 
 * 	-100.0 < x < 100.0
 * 	n 是 32 位有符号整数，其数值范围是 [&minus;231, 231 &minus; 1] 。
 * 
 * 
 * ```
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 * 60ms 91.47%
 * 33.7mb 89.00%
 */
var myPow = function(x, n) {
  let N = n;

  if (N < 0) {
    x = 1 / x;
    N = -N;
  }

  let ans = 1;
  let curProduct = x;

  for (let i = N; i; i = Math.floor(i/2)) {
    if (i % 2 === 1) {
      ans = ans * curProduct;
    }
    
    curProduct *= curProduct;
  }

  return ans;
};

console.log(myPow(2, 10));