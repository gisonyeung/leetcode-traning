/**
 * @name 搜索旋转排序数组
 * @url https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * @date 2020-02-07 18:49
 * @tags 数组、二分查找
 * @description
 * ```
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * 
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 * 
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 * 
 * 你可以假设数组中不存在重复的元素。
 * 
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 
 * 示例 1:
 * 
 * 输入: nums = [4,5,6,7,0,1,2], target = 0
 * 输出: 4
 * 
 * 
 * 示例 2:
 * 
 * 输入: nums = [4,5,6,7,0,1,2], target = 3
 * 输出: -1
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 60ms 91.60%
 * 33.5mb 99.42%
 */
var search = function(nums, target) {
  let left = 0, right = nums.length - 1, mid = Math.floor(right / 2);

  while (left <= right) {
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) { // 左边升序
      if (target >= nums[left] && target <= nums[mid]) { // target 位于左边范围
        right = mid - 1;
      } else { // target 位于右边范围
        left = mid + 1;
      }
    } else { // 右边升序
      if (target >= nums[mid] && target <= nums[right]) { // target 位于右边范围
        left = mid + 1;
      } else { // target 位于左边范围
        right = mid - 1;
      }
    }

    mid = Math.floor(left + (right - left) / 2);
  }

  return -1;
};

console.log(search([4,5,6,7,0,1,2], 4));
console.log(search([4,5,6,7,0,1,2], 3));
console.log(search([1,3], 1));