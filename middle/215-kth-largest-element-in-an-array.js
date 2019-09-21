/**
 * @url https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @tags 堆、分治算法
 * @description
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * @example
 * ```
 * 示例 1:
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 示例 2:
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 * ```
 * 
 * @summary
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 借鉴 K 个小顶堆的思想，求第 K 大的数字，
 * 那我们遍历 nums 时用插入排序维护一个长度为 K 的数组，遍历完成后取数组中最后一个元素即可。
 * 时间复杂度：O(nk)
 * 
 * 76ms(99.78%) ~ 95ms(93.29%)
 * 35.7mb 42.46%
 */
var findKthLargest = function(nums, k) {
  if (nums.length < 2) return nums[0];
  
  let i = 0, j = 0, len = nums.length;
  let kArr = new Array(k).fill(-1);

  if (k == 1) { // 擂台法
    for (i; i < len; i++) {
      if (nums[i] > kArr[0]) {
        kArr[0] = nums[i];
      }
    }
  } else {
    for (i; i < len; i++) {
      if (nums[i] > kArr[k - 1]) { // 大于 kArr 最小值时才进行插入排序
        inner: for (j = 0; j < k; j++) {
          if (nums[i] > kArr[j]) {
            kArr.splice(j, 0, nums[i]);
            kArr.pop();
            break inner;
          }
        }
      }
    }
  }

  // console.log(`[${nums}] 第 ${k} 大的数字：${kArr[k - 1]}`, );
  return kArr[k - 1];
};

var quickSelect = (array, k) => {
  let i = 0, j = 0;
  let tmp, pivot;
  let kSmall = array.length - k; // 求第 k 大相当于求第 N - k 小

  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return arr[kSmall];

    // console.log('sort', arr, left, right);

    i = left, j = right, tmp = 0;
    pivot = arr[Math.floor((i + j) / 2)];

    while (i < j) {
      while (i < j && arr[i] < pivot) i++; // 从左到右扫描，找到第一个大于基准值的 arr[i]
      while(j > i && arr[j] > pivot) j--;  // 从右到左扫描，找到第一个小于基准值的 arr[j]
      
      if (arr[i] === arr[j]) {
        i++;
      } else if (i < j) {
        // console.log('交换', i , j, arr[i], arr[j]);
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
    // console.log(arr);
    // console.log(`i=${i}, j=${j}, pivot=${pivot}, kSmall=${kSmall}`);
    
    if (kSmall === i - 1) {
      // console.log('k === i + 1', arr, i + 1);
      return arr[i- 1];
    }

    return (i - 1 > kSmall) ? sort(arr, left, i - 2) : sort(arr, i, right);
  };

  return sort(array);
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 基于快排的快速选择法
 * 时间复杂度：O(n)
 * 平均每次扔掉一半，则 T(N) = n + n/2 + n/4 + n/8 + n/2^k = n*(1-2^-k)/(1-2^-1) = 2N = O(N)
 * 64ms(100%) ~ 68ms(99.89%) 
 * 35.6mb 45.20%
 */
var findKthLargest = function(nums, k) {
  // console.log(`[${nums}] 第 ${k} 大的数字：${quickSelect(nums, k)}` );
  return quickSelect(nums, k);
};



findKthLargest([3,2,1,5,6,4], 1);
findKthLargest([3,2,1,5,6,4], 2);
findKthLargest([3,2,1,5,6,4], 3);
findKthLargest([3,2,3,1,2,4,5,5,6], 4);
findKthLargest([2,1], 1);