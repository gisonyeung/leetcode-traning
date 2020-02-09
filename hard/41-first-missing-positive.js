/**
 * @name 缺失的第一个正数
 * @url https://leetcode-cn.com/problems/first-missing-positive/
 * @date 2020-02-09 16:04
 * @tags 数组
 * @description
 * ```
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,0]
 * 输出: 3
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,4,-1,1]
 * 输出: 2
 * 
 * 
 * 示例 3:
 * 
 * 输入: [7,8,9,11,12]
 * 输出: 1
 * 
 * 
 * 说明:
 * 
 * 你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 64ms 85.44%
 * 34.5mb 56.11%
 */
var firstMissingPositive = function(nums) {
  let n = nums.length;

  let hasNumberOne = false;

  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      hasNumberOne = true;
      break;
    }
  }

  if (!hasNumberOne) return 1;

  // nums: [1]
  if (n === 1) return 2;

  // 1. 用 1 填充负数、0、和大于 n 的数，在转换以后，nums 只会包含正数
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) nums[i] = 1;
  }

  // 2. 用索引作为数字，用负数符号标记是否出现
  for (let i = 0; i < n; i++) {
    let a = Math.abs(nums[i]);

    if (a === n) {
      nums[0] = -Math.abs(nums[0]);
    } else if (nums[a] > 0) {
      nums[a] = -nums[a];
    }
  }

  // 查找第一个正数
  for (let i = 1; i < n; i++) {
    if (nums[i] > 0) return i;
  }

  if (nums[0] > 0) return n;
  
  return n + 1;
};

console.log(firstMissingPositive([1,2,0]));
console.log(firstMissingPositive([3,4,-1,1]));