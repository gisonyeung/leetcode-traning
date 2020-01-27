/**
 * @name 最大子序和
 * @url https://leetcode-cn.com/problems/maximum-subarray/
 * @tags 贪心算法、字符串、动态规划、回溯算法
 * @description
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * @example
 * ```
 * 示例 1:
 * 
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * ```
 * 
 * @summary
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 贪心法
 * 68ms 79.74%
 * 35mb 79.80%
 */
var maxSubArray = function(nums) {
  let n = nums.length;
  let currSum = nums[0], maxSum = nums[0];

  for(let i = 1; i < n; ++i) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
};

/**
 * @param {number[]} nums
 * @return {number}
 * 动态规划（Kadane 算法）
 * 68ms 79.74%
 * 35.3mb 50.86%
 */
var maxSubArray = function(nums) {
  if (nums.length === 1) return nums[0];

  let n = nums.length, maxSum = nums[0];
  for(let i = 1; i < n; ++i) {
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];
    maxSum = Math.max(nums[i], maxSum);
  }
  return maxSum;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);