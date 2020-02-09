/**
 * @name 最大矩形
 * @url https://leetcode-cn.com/problems/maximal-rectangle/
 * @tags 栈、数组、哈希表、动态规划
 * @star
 * @description
 * ```
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 * 
 * 示例:
 * 
 * 输入:
 * [
 *   ["1","0","1","0","0"],
 *   ["1","0","1","1","1"],
 *   ["1","1","1","1","1"],
 *   ["1","0","0","1","0"]
 * ]
 * 输出: 6
 * 
 * ```
 */

var largestRectangleArea = function(heights) {
  let stack = [-1];
  let maxArea = 0;

  for (let i = 0; i < heights.length; ++i) {
    // 1. 高度优先
    // 当前项高度小于栈中最后一项，则 pop 栈中项，计算一次栈中所有递增柱体的最大面积
    // 这个操作(栈中累积高度递增的柱体)可以保证，回溯到该柱体计算面积时，该高度对于往后递增的每个柱体都是安全高度，放心计算面积。
    while (stack[stack.length - 1] != -1 && heights[i] < heights[stack[stack.length - 1]]) {
      maxArea = Math.max(maxArea, heights[stack.pop()] * (i - stack[stack.length - 1] - 1));
    }
    stack.push(i);
  }

  // 2. 宽度优先
  // 此时栈中递增，并可能包含最小公共高度
  while (stack[stack.length - 1] !== -1) {
    maxArea = Math.max(maxArea, heights[stack.pop()] * (heights.length - stack[stack.length - 1] -1));
  }

  return maxArea;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 * 80ms 98.22%
 * 39.9mb 69.23%
 */
var maximalRectangle = function(matrix) {
  if (matrix.length === 0) return 0;

  let maxArea = 0, m = matrix.length, n = matrix[0].length;
  let dp = new Array(n).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[j] = matrix[i][j] === '1' ? (dp[j] + 1) : 0;
    }

    maxArea = Math.max(maxArea, largestRectangleArea(dp));
  }

  return maxArea;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  if (matrix.length === 0) return 0;
  let m = matrix.length, n = matrix[0].length;

  let left = new Array(n).fill(0);
  let right = new Array(n).fill(n);
  let height = new Array(n).fill(0);

  let maxArea = 0;

  for (let i = 0; i < m; i++) {
    let cur_left = 0, cur_right = n;

    // update right
    for(let j = n - 1; j >= 0; j--) {
      if(matrix[i][j] === '1') { 
        right[j] = Math.min(right[j], cur_right);
      } else {
        right[j] = n; 
        cur_right = j;
      }
    }

    // update height & left
    for (let j = 0; j < n; j++) {
      // for height
      height[j] = matrix[i][j] === '1' ? (height[j] + 1) : 0;

      if (matrix[i][j] === '1') {
        // for left
        left[j] = Math.max(left[j], cur_left);
      } else {
        // for left
        left[j] = 0;
        cur_left = j + 1;
      }

      // update area
      maxArea = Math.max(maxArea, (right[j] - left[j]) * height[j]);
    }
  }

  return maxArea;
};



console.log(maximalRectangle([
  ['1','0','1','0','0'],
  ['1','0','1','1','1'],
  ['1','1','1','1','1'],
  ['1','0','0','1','0']
]));