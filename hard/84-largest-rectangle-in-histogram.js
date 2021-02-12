/**
 * @name 柱状图中最大的矩形
 * @url https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
 * @date 2020-01-29 17:34
 * @tags 栈、数组
 * @star
 * @description
 * ```
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 * 
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 * 
 * 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
 *
 * 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
 * 
 * 示例:
 * 
 * 输入: [2,1,5,6,2,3]
 * 输出: 10
 * 
 * ```
 */

/**
 * @param {number[]} heights
 * @return {number}
 * 52ms 100%
 * 37.1mb 44.77%
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

console.log(largestRectangleArea([2,1,5,6,2,3]));