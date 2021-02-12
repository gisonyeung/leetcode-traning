/**
 * @name 不同路径2
 * @url https://leetcode-cn.com/problems/unique-paths-ii/
 * @date 2020-01-28 14:30
 * @tags 数组、动态规划
 * @description
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 * 说明：m 和 n 的值均不超过 100。
 * 
 * @example
 * ```
 * 输入:
 * [
 *   [0,0,0],
 *   [0,1,0],
 *   [0,0,0]
 * ]
 * 输出: 2
 * 解释:
 * 3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 * ```
 * 
 * @summary
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 * 60ms 97.01%
 * 34.9% 93.04%
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0;

  let dp = new Array(obstacleGrid.length);
  let m = obstacleGrid.length, n = obstacleGrid[0].length;

  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n).fill(1);
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) { // 初始化障碍物
        dp[i][j] = 0;
      } else if (i === 0 && j >= 1) { // 初始化第一行，每一项当前的值取决于矩阵左方
        dp[i][j] = dp[i][j-1];
      } else if (j === 0 && i >= 1) { // 初始化第一列，每一项当前的值取决于矩阵上方
        dp[i][j] = dp[i-1][j];
      } else if (i >= 1 && j>= 1) { // 叠加矩阵中左方与上方结果
        dp[i][j] = dp[i-1][j] + dp[i][j-1];
      }
    }
  }

  return dp[m-1][n-1];
};

uniquePathsWithObstacles([
  [0,0,0],
  [0,1,0],
  [0,0,0]
]);

uniquePathsWithObstacles([
  [0,1]
]);

uniquePathsWithObstacles([
  [0,0],
  [1,1],
  [0,0],
]);

