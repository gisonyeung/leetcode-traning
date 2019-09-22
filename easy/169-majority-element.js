/**
 * @name 求众数
 * @url https://leetcode-cn.com/problems/majority-element/
 * @description
 * 给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在众数。
 * 
 * @example
 * ```
 * 输入: [3,2,3]
 * 输出: 3
 * 
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 3
 * ```
 * 
 * @summary
 * Boyer-Moore 投票算法：如果我们把众数记为 +1 ，把其他数记为 -1 ，将它们全部加起来，显然和大于 0 ，从结果本身我们可以看出众数比其他数多。
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let majorNum = nums[0], count = 0;
  let i = 0, len = nums.length;

  for (i; i < len; i++) {
    if (nums[i] !== majorNum) {
      if (count === 0) {
        majorNum = nums[i];
        count = 1;
      } else {
        count--;
      }
    } else {
      count++;
    }
  }

  return majorNum;
};


majorityElement([3, 2, 3]);
majorityElement([2, 2, 1, 1, 1, 2, 2]);