/**
 * @name 组合总和
 * @url https://leetcode-cn.com/problems/combination-sum/
 * @date 2019-09-28 01:01
 * @tags 数组、回溯算法
 * @description
 * 给定一个无重复元素的数组 candidates 和一个目标数 target，找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取。
 * 说明：
 * - 所有数字（包括 target）都是正整数。
 * - 解集不能包含重复的组合。
 * 
 * @example
 * ```
 * 示例 1:
 * 输入: candidates = [2,3,6,7], target = 7,
 * 所求解集为:
 * [
 *   [7],
 *   [2,2,3]
 * ]
 * 
 * 示例 2:
 * 输入: candidates = [2,3,5], target = 8,
 * 所求解集为:
 * [
 *   [2,2,2,2],
 *   [2,3,3],
 *   [3,5]
 * ]
 * ```
 * 
 * @summary
 * 
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 84ms 98.84%
 * 36.8mb 72.81%
 */
var combinationSum = function(candidates, target) {
  if (!candidates || !candidates.length || target === 0) return [];

  // 由大到小排序，方便剪枝
  candidates.sort((a,b) => b - a);

  let res = [];
  let i = 0, len = candidates.length, minNum = candidates[len - 1];

  for (i; i < len; i++) {
    // console.log(`start:${i}`);
    dfs([], i, target);
  }

  function dfs(curRes, start, restSum, isBFS = false) {
    if (restSum < 0 || start >= len) return;

    let nextRestNum = restSum - candidates[start];
    // console.log('nextRestNum', restSum, '-', candidates[start], '=', nextRestNum);

    if (nextRestNum === 0) { // 结果
      // console.log('结果', (curRes.concat(candidates[start])));
      res.push(curRes.concat(candidates[start]));
      // 上一步的 restSum 不为初始值则继续尝试右移下标，否则终止，因为这相当于和根循环重复了
      return restSum !== target ? dfs(curRes, ++start, restSum) : null;
    }
    
    // 如果下一步剩余的总和已经比集合里最小值还要小了，说明这一次相减会导致没结果，那就应该跳过这一步
    if (nextRestNum < minNum) { 
      // console.log('nextRestNum < minNum', curRes);
      // 上一步的 restSum 不为初始值则继续尝试右移下标，否则终止，因为这相当于和根循环重复了
      return restSum !== target ? dfs(curRes, ++start, restSum) : null;
    } else if (nextRestNum < candidates[start]) { // 下一步剩余的总和比当前扫描的值小，则可以将下标右移指向下一个扫描值
      dfs(curRes.concat(candidates[start]), start + 1, nextRestNum);
    } else { // 下一步总和比当前值还要大，则有两种解法，按当前计算结果继续深度 / 在原结果广度
      dfs(curRes.concat(candidates[start]), start, nextRestNum);
    }

    // 如果当前已经是广度遍历，则不能再跳过该步了，否则接下来外层的广度遍历会和下面的循环陈洪福
    if (restSum !== target && restSum > candidates[start] && start < len - 1 && !isBFS) {
      // console.log('跳过上面的解法，继续广度', curRes, start + 1, len);
      for (let j = start + 1; j < len; j++) {
        dfs(curRes, j, restSum, true);
      }
    }

  }

  // console.log('\nres', res, '\n');
  return res;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 64ms 100.00%
 * 36.3mb 83.33%
 * 极致简化版
 */
var combinationSum = function (candidates, target) {
  // 由大到小排序
  candidates.sort((a, b) => b - a);

  let res = [], path = [];
  let len = candidates.length, minNum = candidates[len - 1];

  get_combin(candidates, target, 0, path);

  function get_combin(candidates, target, start, path) {
    if (target == 0) {
      return res.push(path.slice());
    }

    if (target < minNum) return;

    for (let i = start; i < len; i++) {
      path.push(candidates[i]);
      get_combin(candidates, target - candidates[i], i, path);
      // 无论是该路径大于target还是等于target，都需要对其删除最后一个元素，进行其余支路的搜索
      path.pop();
    }
  }

  return res;
};





// combinationSum([3,2,8], 18);
// combinationSum([7,3,2], 18);
// combinationSum([1,2], 4);
// combinationSum([1,2], 2);
// combinationSum([], 7);
// combinationSum([2,3,6,7], 0);
combinationSum([2,3,6,7], 7);
// combinationSum([2,3,5], 8);