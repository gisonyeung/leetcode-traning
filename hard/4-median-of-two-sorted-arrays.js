/**
 * @name 寻找两个有序数组的中位数
 * @url https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * @tags 数组、二分查找、分治算法
 * @star
 * @description
 * ```
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 * 
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 
 * 你可以假设 nums1 和 nums2 不会同时为空。
 * 
 * 示例 1:
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 
 * 则中位数是 2.0
 * 
 * 
 * 示例 2:
 * 
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 
 * 则中位数是 (2 + 3)/2 = 2.5
 * 
 * 
 * ```
 * 
 * @summary
 * 中位数的问题，可以把问题转换为求第k小的数。
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 112ms 97.85%
 * 38.7mb 95.40%
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let k1 = Math.floor((n + m + 1) / 2);
  let k2 = Math.floor((n + m + 2) / 2);

  return (getKth(nums1, 0, n - 1, nums2, 0, m - 1, k1) + getKth(nums1, 0, n - 1, nums2, 0, m - 1, k2)) / 2;
};

function getKth(nums1, start1, end1, nums2, start2, end2, k) {
  let len1 = end1 - start1 + 1; 
  let len2 = end2 - start2 + 1;

  // 让 len1 的长度小于 len2，这样就能保证如果有数组空了，一定是 len1
  if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
  if (len1 === 0) return nums2[start2 + k - 1];

  if (k === 1) return Math.min(nums1[start1], nums2[start2]);

  let k_harf = Math.floor(k / 2);
  let _start1 = start1 + Math.min(len1, k_harf) - 1;
  let _start2 = start2 + Math.min(len2, k_harf) - 1;
  
  // 舍弃更小的数组
  if (nums1[_start1] > nums2[_start2]) {
    return getKth(nums1, start1, end1, nums2, _start2 + 1, end2, k - (_start2 - start2 + 1));
  } else {
    return getKth(nums1, _start1 + 1, end1, nums2, start2, end2, k - (_start1 - start1 + 1));
  }
}

console.log(findMedianSortedArrays([1,2], [4]));
console.log(findMedianSortedArrays([1,2], [3,4]));
console.log(findMedianSortedArrays([1,2], [4,5]));
console.log(findMedianSortedArrays([1,2], [3,4,5]));
console.log(findMedianSortedArrays([1,2], [-1,3]));
console.log(findMedianSortedArrays([1,3], [2,4,5,6]));