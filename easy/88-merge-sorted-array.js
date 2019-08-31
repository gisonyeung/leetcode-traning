/**
 * @url https://leetcode-cn.com/problems/merge-sorted-array/
 * @description
 * 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
 * 说明：
 * - 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
 * - 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * 
 * @example
 * ```
 * 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 
 * 输出: [1,2,2,3,5,6]
 * ```
 * 
 * @summary
 * 双指针 / 从后往前遍历
 * 时间复杂度：O(n+m)
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let p = m + n - 1;
  let p1 = m - 1;
  let p2 = n - 1;

  while (p1 >= 0 && p2 >= 0) {
    nums1[p--] = (nums1[p1] < nums2[p2]) ? nums2[p2--] : nums1[p1--];
  }

  // nums2 剩余数组补全到 nums1 中空白位置
  if (p2 >= 0) {
    // Array.splice(startIndex, deleteCount, addContent)
    nums1.splice(0, p2 + 1, ...nums2.slice(0, p2 + 1));
  }
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
merge([0], 0, [1], 1);
merge([2,0], 1, [1], 1);