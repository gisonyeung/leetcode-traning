/**
 * @name 搜索二维矩阵 II
 * @url https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
 * @date 2019-09-02 20:02
 * @description
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * - 每行的元素从左到右升序排列。
 * - 每列的元素从上到下升序排列。
 * 
 * @example
 * ```
 * [
 *   [1,   4,  7, 11, 15],
 *   [2,   5,  8, 12, 19],
 *   [3,   6,  9, 16, 22],
 *   [10, 13, 14, 17, 24],
 *   [18, 21, 23, 26, 30]
 * ]
 * ```
 * 
 * @summary
 * 初始化一个指向矩阵左下角的，若目标值大于当前值则列数下标+1，若目标值小于当前值则行数-1，直至找到目标值或行列下标溢界。
 * 时间复杂度：O(n+m)
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  if (!matrix.length) return false;

  let row = matrix.length - 1;
  let col = 0, maxCol = matrix[0].length - 1;

  while(row >= 0 && col <= maxCol) {
    if (target > matrix[row][col]) {
      col++;
    } else if (target < matrix[row][col]) {
      row--;
    } else {
      return true;
    }
  }

  return false;
};

searchMatrix([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 5);

searchMatrix([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 20);