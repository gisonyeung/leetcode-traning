/**
 * @name 螺旋矩阵
 * @url https://leetcode-cn.com/problems/spiral-matrix/
 * @date 2020-02-10 21:08
 * @tags 数组
 * @description
 * ```
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 
 * 示例 1:
 * 
 * 输入:
 * [
 *  [ 1, 2, 3 ],
 *  [ 4, 5, 6 ],
 *  [ 7, 8, 9 ]
 * ]
 * 输出: [1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * [
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9,10,11,12]
 * ]
 * 输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 * ```
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 * 64ms 61.12%
 * 33.5mb 97.84%
 */
var spiralOrder = function(matrix) {
  if (matrix.length === 0) return [];

  let ans = [];
  let r1 = 0, r2 = matrix.length - 1, c1 = 0, c2 = matrix[0].length - 1;

  while (r1 <= r2 && c1 <= c2) {
    for (let c = c1; c <= c2; c++) ans.push(matrix[r1][c]);
    for (let r = r1 + 1; r <= r2; r++) ans.push(matrix[r][c2]);
    if (r1 < r2 && c1 < c2) {
      for (let c = c2 - 1; c > c1; c--) ans.push(matrix[r2][c]);
      for (let r = r2; r > r1; r--) ans.push(matrix[r][c1]);
    }
    r1++;
    r2--;
    c1++;
    c2--;
  }

  return ans;
};

console.log(spiralOrder(
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9,10,11,12]
  ]
));