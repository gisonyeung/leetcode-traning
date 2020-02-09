/**
 * @name 接雨水
 * @url https://leetcode-cn.com/problems/trapping-rain-water/
 * @date 2020-02-09 18:38
 * @tags 栈、数组、双指针
 * @star
 * @description
 * ```
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 
 * 
 * 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。
 * 
 * 示例:
 * 
 * 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出: 6
 * 
 * ```
 */

/**
 * @param {number[]} height
 * @return {number}
 * 64ms 94.83%
 * 35.3mb 52.52%
 */
var trap = function(height) {
  let stack = [];
  let ans = 0;

  for (let i = 0; i < height.length; i++) {
    // 当前项高度大于栈顶元素高度，则可以确定存在洼地区间 (栈二,栈顶,当前项)，此时弹出栈顶元素计算单位面积
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      let top = stack.pop();

      if (stack.length === 0) break;

      let stackTopIndex = stack.length - 1;
      let distance = i - stack[stackTopIndex] - 1;
      let boundedHeight = Math.min(height[i], height[stack[stackTopIndex]]) - height[top];

      ans += distance * boundedHeight;
    }

    stack.push(i);
  }

  return ans;
};


/**
 * @param {number[]} height
 * @return {number}
 * 64ms 94.83%
 * 35mb 75.00%
 */
var trap = function(height) {
  let left = 0, right = height.length - 1;
  let ans = 0;
  let left_max = 0, right_max = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= left_max) {
        left_max = height[left];
      } else {
        ans += left_max - height[left];
      }

      left++;
    } else {
      if (height[right] >= right_max) {
        right_max = height[right];
      } else {
        ans += right_max - height[right];
      }

      right--;
    }
  }

  return ans;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));