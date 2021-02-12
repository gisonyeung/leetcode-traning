/**
 * @name 爬楼梯
 * @url https://leetcode-cn.com/problems/climbing-stairs/
 * @date 2020-01-28 17:14
 * @tags 动态规划
 * @description
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 * 
 * @example
 * ```
 * 示例 1:
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 * 
 * 示例 2:
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 * ```
 * 
 * @summary
 */

/**
 * @param {number} n
 * @return {number}
 * 动态规划
 * 52ms 97.62%
 * 33.7mb 76.82%
 */
var climbStairs = function(n) {
  if (n === 1) return 1;

  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

/**
 * @param {number} n
 * @return {number}
 * 斐波那契数
 * 52ms 97.62%
 * 33.7mb 76.82%
 */
var climbStairs = function(n) {
  if (n == 1) return 1;

  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
};

/**
 * @param {number} n
 * @return {number}
 * 斐波那契公式
 * 56ms 92.07%
 * 33.7mb 76.82%
 */
var climbStairs = function(n) {
  let sqrt5 = Math.sqrt(5);
  let fibn = Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1);
  return Math.round(fibn / sqrt5);
};

climbStairs(2);
climbStairs(9);