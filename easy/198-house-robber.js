/**
 * @url https://leetcode-cn.com/problems/house-robber/
 * @tags 动态规划
 * @description
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
 * 
 * @example
 * ```
 * 示例 1:
 * 输入: [1,2,3,1]
 * 输出: 4
 * 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 * 
 * 示例 2:
 * 输入: [2,7,9,3,1]
 * 输出: 12
 * 解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 * 偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 * ```
 * 
 * @summary
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 48ms 100%
 * 34.1mb 8.42%
 */
var rob = function(nums) {
  let prevMax = 0, currMax = 0, temp = 0;
  let i = 0, len = nums.length;

  for (i; i < len; i++) {
    temp = currMax;
    currMax = Math.max(prevMax + nums[i], currMax);
    prevMax = temp;
  }

  // console.log(currMax);
  return currMax;
};

rob([1,2,3,1]);