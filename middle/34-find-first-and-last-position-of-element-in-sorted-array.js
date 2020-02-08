/**
 * @name 在排序数组中查找元素的第一个和最后一个位置
 * @url https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * @date 2020-02-08 13:19
 * @tags 数组、二分查找
 * @description
 * ```
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 
 * 如果数组中不存在目标值，返回 [-1, -1]。
 * 
 * 示例 1:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: [3,4]
 * 
 * 示例 2:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 6
 * 输出: [-1,-1]
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 64ms 80.92%
 * 35.2mb 54.78%
 */
var searchRange = function(nums, target) {
  let left = binarySearchLeftBound(nums, target);
  let right = binarySearchRightBound(nums, target);

  return [left].concat([right]);
};

function binarySearchLeftBound(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0, right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (target <= nums[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return nums[left] == target ? left : -1;
}

function binarySearchRightBound(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0, right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (target >= nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return nums[left-1] == target ? left-1 : -1;
}

console.log(searchRange([5,7,7,8,8,10], 8));
console.log(searchRange([5,7,7,8,8,10], 6));