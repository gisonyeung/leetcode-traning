/**
 * @name 三数之和
 * @url https://leetcode-cn.com/problems/3sum/
 * @date 2020-02-02 14:08
 * @tags 数组、双指针
 * @description
 * ```
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 *  
 * 
 * 示例：
 * 
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 
 * 满足要求的三元组集合为：
 * [
 *   [-1, 0, 1],
 *   [-1, -1, 2]
 * ]
 * 
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 176ms 95.32%
 * 46.8mb 55.11%
 */
var threeSum = function(nums) {
  let len = nums.length, res = [];

  if (len < 3) return res;

  // 小到大排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res; 

    // 跳过重复项
    if (i > 0 && nums[i] === nums[i-1]) continue;

    let L = i + 1, R = len - 1;

    while (L < R) {
      if (nums[i] + nums[L] + nums[R] === 0) {
        res.push([nums[i], nums[L], nums[R]]);

        while (L < R && nums[L] === nums[L+1]) L++;
        while (L < R && nums[R] === nums[R-1]) R--;

        L++;
        R--;
      } else if (nums[i] + nums[L] + nums[R] > 0) {
        R--;
      } else {
        L++;
      }
    }
  }

  return res;

};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));