/**
 * @name 不同路径
 * @url https://leetcode-cn.com/problems/unique-paths/
 * @tags 数组、动态规划
 * @star
 * @description
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 问总共有多少条不同的路径？
 * 例如，上图是一个7 x 3 的网格。有多少可能的路径？
 * 
 * @example
 * ```
 * 示例 1:
 * 输入: m = 3, n = 2
 * 输出: 3
 * 解释:
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向右 -> 向下
 * 2. 向右 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向右
 * 
 * 示例 2:
 * 输入: m = 7, n = 3
 * 输出: 28
 * ```
 * 
 * @summary
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 56ms 95.94%
 * 33.8mb 61.01%
 */
var uniquePaths = function(m, n) {
  let dp = new Array(m).fill([]);
  dp.forEach((val, index) => {
    dp[index] = new Array(n).fill(1);
  });

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }

  return dp[m-1][n-1];
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 56ms 95.94%
 * 33.7mb 83.83%
 */
var uniquePaths = function(m, n) {
  let dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j-1];
    }
  }

  return dp[n-1];
};

uniquePaths(3, 2);