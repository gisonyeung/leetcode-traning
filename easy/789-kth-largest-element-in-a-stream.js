/**
 * @name 数据流中的第 K 大元素
 * @url https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/
 * @date 2021-02-13 11:48
 * @star
 * @tags 堆、设计
 * @description
 * ```
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 
 * 请实现 KthLargest 类：
 * 
 * 
 * 	KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * 	int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 
 * 
 *  
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["KthLargest", "add", "add", "add", "add", "add"]
 * [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * 输出：
 * [null, 4, 5, 5, 8, 8]
 * 
 * 解释：
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // return 4
 * kthLargest.add(5);   // return 5
 * kthLargest.add(10);  // return 5
 * kthLargest.add(9);   // return 8
 * kthLargest.add(4);   // return 8
 * 
 * 
 *  
 * 提示：
 * 
 * 
 * 	1 4
 * 	0 4
 * 	-104 4
 * 	-104 4
 * 	最多调用 add 方法 104 次
 * 	题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素
 * 
 * 
 * ```
 */

/**
 * @param {number} k
 * @param {number[]} nums
 * n 个数据，前 k 的排序数组，初始化 O(klogk) + 新增 O(k)
 * 180ms 64.53%
 * 45.1mb 98.91%
 */
var KthLargest = function(k, nums) {
  this.k = k;
  this.queue = nums.sort((a, b) => b - a);
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  let insertIndex = -1;
  for (let i = 0; i < this.queue.length; i++) {
    if (val >= this.queue[i]) {
      insertIndex = i;
      break;
    }
  }

  if (insertIndex !== -1) {
    this.queue.splice(insertIndex, 0, val);
  
    if (this.queue.length > this.k) {
      this.queue.pop();
    }
  } else if (this.queue.length < this.k) {
    this.queue.push(val);
  }

  return this.queue[this.k - 1];
};

/**
 * @param {number} k
 * @param {number[]} nums
 * 前 k 的优先队列，数组二叉堆，初始化 O(k) + 新增 O(nlogk)
 * 140ms 98.72%
 * 45.7mb 71.44%
 */
var KthLargest = function(k, nums) {
  this.k = k;
  this.heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    this.add(nums[i]);
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  this.heap.offer(val);

  // 淘汰最小
  if (this.heap.size() > this.k) {
    this.heap.poll();
  }

  return this.heap.peak();
};

class MinHeap {
  constructor(data = []) {
    this.data = data;
    this.comparator = (a, b) => a - b; // 升序
    this.heapify();
  }

  heapify() {
    if (this.size() < 2) return;

    let len = this.size();
    for (let i = 1; i < len; i++) {
      this.bubbleUp(i);
    }
  }
  
  peak() {
    return this.data[0] || null;
  }

  offer(val) {
    this.data.push(val);
    this.bubbleUp(this.size() - 1);
  }

  poll() {
    if (this.size() === 0) return null;

    const siftResult = this.data[0];
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return siftResult;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown(index) {
    const lastIndex = this.size() - 1;
    while (true) {
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;
      let bubbleIndex = index;

      if (
        leftChildIndex <= lastIndex
        && this.comparator(this.data[leftChildIndex], this.data[bubbleIndex]) < 0
      ) {
        bubbleIndex = leftChildIndex;
      }

      if (
        rightChildIndex <= lastIndex
        && this.comparator(this.data[rightChildIndex], this.data[bubbleIndex]) < 0
      ) {
        bubbleIndex = rightChildIndex;
      }

      if (index !== bubbleIndex) {
        this.swap(index, bubbleIndex);
        index = bubbleIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }

  size() {
    return this.data.length;
  }
}


/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

var obj = new KthLargest(3, [4, 5, 8, 2]);
console.log(obj.add(3));
console.log(obj.add(5));
console.log(obj.add(10));
console.log(obj.add(9));
console.log(obj.add(4));