/**
 * @name 颜色分类
 * @url https://leetcode-cn.com/problems/sort-colors/
 * @date 2019-11-03 19:08
 * @tags 排序、数组、双指针
 * @description
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 
 * 此题中，我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。
 * 
 * 注意:
 * 不能使用代码库中的排序函数来解决这道题。
 * 
 * @example
 * ```
 * 输入: [2,0,2,1,1,0]
 * 输出: [0,0,1,1,2,2]
 * ```
 * 
 * @summary
 * 
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 68ms 76.15%
 * 33.7mb 50.78%
 */
var sortColors = function(nums) {
  let p1 = 0, p2 = nums.length - 1, curr = 0;

  while (curr <= p2) {
    if (nums[curr] == 0) {
      nums[curr] = nums[p1];
      nums[p1] = 0;
      curr++;
      p1++;
    } else if (nums[curr] == 2) {
      nums[curr] = nums[p2];
      nums[p2] = 2;
      p2--;
    } else {
      curr++;
    }
  }
};

sortColors([2,0,2,1,1,0]);