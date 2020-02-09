/**
 * @name 全排列
 * @url https://leetcode-cn.com/problems/permutations/
 * @date 2020-02-09 23:20
 * @tags 回溯算法
 * @description
 * ```
 * 给定一个没有重复数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 * 
 * 输入: [1,2,3]
 * 输出:
 * [
 *   [1,2,3],
 *   [1,3,2],
 *   [2,1,3],
 *   [2,3,1],
 *   [3,1,2],
 *   [3,2,1]
 * ]
 * 
 * ```
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 72ms 93.32%
 * 37.2mb 45.59%
 */
var permute = function(nums) {
  let ans = [];

  if (nums.length === 0) return [[]];

  backtrackHelper(ans, [], nums);

  return ans;
};

function backtrackHelper(ans, cur, rest) {
  if (rest.length === 1) return ans.push(cur.concat(rest));

  for (let i = 0; i < rest.length; i++) {
    let cur_copy = cur.slice(0);
    let rest_copy = rest.slice(0);

    cur_copy.push(rest[i]);
    rest_copy.splice(i, 1);

    backtrackHelper(ans, cur_copy, rest_copy);
  }
}

console.log(permute([1,2,3]));
console.log(permute([1,2]));
console.log(permute([1]));
console.log(permute([]));