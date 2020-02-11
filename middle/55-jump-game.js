/**
 * @name 跳跃游戏
 * @url https://leetcode-cn.com/problems/jump-game/
 * @date 2020-02-11 12:23
 * @tags 贪心算法、数组
 * @description
 * ```
 * 给定一个非负整数数组，你最初位于数组的第一个位置。
 * 
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 判断你是否能够到达最后一个位置。
 * 
 * 示例 1:
 * 
 * 输入: [2,3,1,1,4]
 * 输出: true
 * 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,2,1,0,4]
 * 输出: false
 * 解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。
 * 
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 * 52ms 100.00%
 * 35.6mb 86.63%
 */
var canJump = function(nums) {
  let lastPos = nums.length - 1;
  for (let i = lastPos - 1; i >= 0; i--) {
    if (i + nums[i] >= lastPos) {
      lastPos = i;
    }
  }

  return lastPos === 0;
};

console.log(canJump([2,3,1,1,4]));
console.log(canJump([3,2,1,0,4]));
console.log(canJump([1]));
console.log(canJump([0]));
console.log(canJump([0,1]));
console.log(canJump([1,1]));