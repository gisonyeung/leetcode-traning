/**
 * @name 旋转图像
 * @url https://leetcode-cn.com/problems/rotate-image/
 * @date 2020-02-09 23:51
 * @tags 数组
 * @description
 * ```
 * 给定一个 n &times; n 的二维矩阵表示一个图像。
 * 
 * 将图像顺时针旋转 90 度。
 * 
 * 说明：
 * 
 * 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
 * 
 * 示例 1:
 * 
 * 给定 matrix = 
 * [
 *   [1,2,3],
 *   [4,5,6],
 *   [7,8,9]
 * ],
 * 
 * 原地旋转输入矩阵，使其变为:
 * [
 *   [7,4,1],
 *   [8,5,2],
 *   [9,6,3]
 * ]
 * 
 * 
 * 示例 2:
 * 
 * 给定 matrix =
 * [
 *   [ 5, 1, 9,11],
 *   [ 2, 4, 8,10],
 *   [13, 3, 6, 7],
 *   [15,14,12,16]
 * ], 
 * 
 * 原地旋转输入矩阵，使其变为:
 * [
 *   [15,13, 2, 5],
 *   [14, 3, 4, 1],
 *   [12, 6, 8, 9],
 *   [16, 7,10,11]
 * ]
 * 
 * 
 * ```
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 60ms 86.47%
 * 33.8mb 43.98%
 */
var rotate = function(matrix) {
  let n = matrix.length;
  let rowTimes = Math.floor((n + 1) / 2);
  let colTimes = Math.floor(n / 2);

  for (let i = 0; i < rowTimes; i++) {
    for (let j = 0; j < colTimes; j++) {
      let temp = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j -1];
      matrix[n - i - 1][n - j - 1] = temp;
    }
  }

  return matrix;
};

console.log(rotate(
  [
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
  ], 
));