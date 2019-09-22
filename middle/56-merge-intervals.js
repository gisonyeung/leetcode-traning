/**
 * @name 合并区间
 * @url https://leetcode-cn.com/problems/merge-intervals/
 * @tags 排序、数组
 * @description
 * 给出一个区间的集合，请合并所有重叠的区间。
 * 
 * @example
 * ```
 * 示例 1:
 * 
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]。
 * 
 * 示例 2:
 * 
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * ```
 * 
 * @summary
 * 
 */

var quickSort = (array) => {
  let i = 0, j = 0;
  let tmp, pivot;

  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;

    i = left, j = right, tmp = 0;
    pivot = arr[Math.floor((i + j) / 2)][0];

    while (i < j) {
      while (i < j && arr[i][0] < pivot) i++; // 从左到右扫描，找到第一个大于基准值的 arr[i]
      while(j > i && arr[j][0] > pivot) j--;  // 从右到左扫描，找到第一个小于基准值的 arr[j]
      
      if (arr[i][0] === arr[j][0]) {
        i++;
      } else if (i < j) {
        // console.log('交换', i , j, arr[i], arr[j]);
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }

    sort(arr, left, j - 1);
    sort(arr, j + 1, right);
  };

  sort(array);
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 自己实现快排
 * 100ms 96.49%
 * 38.2mb 16.5%
 */
var merge = function(intervals) {
  if (intervals.length <= 1) return intervals;

  quickSort(intervals);
  // console.log('排序结果:', intervals);
  
  let i = 1, len = intervals.length;
  for (i; i < len; i++) {
    if (!intervals[i]) {
      intervals.splice(i, 1);
      len -= 1;
      i -= 1;
    } else if (intervals[i][0] <= intervals[i-1][1]) {
      intervals.splice(i - 1, 2, [intervals[i-1][0], Math.max(intervals[i][1], intervals[i-1][1])]);
      len -= 1;
      i -= 1;
    }
  }
  
  // console.log('合并结果:', intervals);
  return intervals;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 使用 V8 Timsort
 * 88ms 99.56%
 * 38.3mb 14.43%
 */
var merge = function(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a,b) => a[0] - b[0]);
  // console.log('排序结果:', intervals);
  
  let i = 1, len = intervals.length;
  for (i; i < len; i++) {
    if (!intervals[i]) {
      intervals.splice(i, 1);
      len -= 1;
      i -= 1;
    } else if (intervals[i][0] <= intervals[i-1][1]) {
      intervals.splice(i - 1, 2, [intervals[i-1][0], Math.max(intervals[i][1], intervals[i-1][1])]);
      len -= 1;
      i -= 1;
    }
  }
  
  // console.log('合并结果:', intervals);
  return intervals;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 冒泡排序，一边比较一边合并，针对这道题来说，arr.length 一直降低，并且数据集长度都比较少，反而这种解法更快了。
 * 80ms 99.78%
 * 37mb 61.86%
 */
var merge = function (arr) {
  for (var i = 0; i < arr.length;) {
    var now = 1;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i][0] >= arr[j][0] && arr[i][0] <= arr[j][1] && arr[i][1] >= arr[j][1]) {
        arr[i][0] = arr[j][0];
        arr.splice(j, 1);
        now = 0;
      } else if (arr[i][0] <= arr[j][0] && arr[j][0] <= arr[i][1] && arr[j][1] >= arr[i][1]) {
        arr[i][1] = arr[j][1];
        arr.splice(j, 1);
        now = 0;
      } else if (arr[i][0] <= arr[j][0] && arr[j][1] <= arr[i][1]) {
        arr.splice(j, 1);
        now = 0;
      } else if (arr[i][0] > arr[j][0] && arr[j][1] > arr[i][1]) {
        arr[i][0] = arr[j][0];
        arr[i][1] = arr[j][1];
        arr.splice(j, 1);
        now = 0;
      }
    }
    i = i + now;
  }
  return arr;
};

merge([[1,3],[2,6],[8,10],[15,18]]);
merge([[2,6],[15,18],[8,10],[1,3]]);
merge([[1,4],[1,4]]);
merge([[1,4],[0,2],[3,5]]);
merge([[2,3],[2,2],[3,3],[1,3],[5,7],[2,2],[4,6]]);