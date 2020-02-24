/**
 * @name 矩阵置零
 * @url https://leetcode-cn.com/problems/set-matrix-zeroes/
 * @date 2020-02-24 21:47
 * @tags 数组
 * @description
 * ```
 * 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
 * 
 * 示例 1:
 * 
 * 输入: 
 * [
 *   [1,1,1],
 *   [1,0,1],
 *   [1,1,1]
 * ]
 * 输出: 
 * [
 *   [1,0,1],
 *   [0,0,0],
 *   [1,0,1]
 * ]
 * 
 * 
 * 示例 2:
 * 
 * 输入: 
 * [
 *   [0,1,2,0],
 *   [3,4,5,2],
 *   [1,3,1,5]
 * ]
 * 输出: 
 * [
 *   [0,0,0,0],
 *   [0,4,5,0],
 *   [0,3,1,0]
 * ]
 * 
 * 进阶:
 * 
 * 
 * 	一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 	一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 	你能想出一个常数空间的解决方案吗？
 * 
 * 
 * ```
 * 
 * @summary
 * 仔细思考先后顺序
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 88ms 95.33%
 * 37mb 96.38%
 */
var setZeroes = function(matrix) {
  let isCol = false;
  let R = matrix.length;
  let C = matrix[0].length;

  for (let i = 0; i < R; i++) {

    // 首列是否为 0
    if (matrix[i][0] == 0) {
      isCol = true;
    }

    // 第二列开始，将行首、列首置 0
    for (let j = 1; j < C; j++) {
      if (matrix[i][j] == 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // 根据行首列首数值，从第二行&第二列开始覆盖赋值
  for (let i = 1; i < R; i++) {
    for (let j = 1; j < C; j++) {
      if (matrix[i][0] == 0 || matrix[0][j] == 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // 第一行是否需要置 0
  if (matrix[0][0] == 0) {
    for (let j = 0; j < C; j++) {
      matrix[0][j] = 0;
    }
  }

  // 第一列是否需要置 0
  if (isCol) {
    for (let i = 0; i < R; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
};

console.log(setZeroes(
  [
    [1,0,3],
  ]
));
console.log(setZeroes(
  [
    [1,1,1],
    [0,1,2]
  ]
));
console.log(setZeroes(
  [
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ]
));
console.log(setZeroes(
  [
    [0,1,2,0],
    [3,4,5,2],
    [1,3,1,5]
  ]
));