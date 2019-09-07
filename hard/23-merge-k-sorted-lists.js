/**
 * @url https://leetcode-cn.com/problems/merge-k-sorted-lists/
 * @tags 堆、链表、分治算法
 * @description
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 * 
 * @example
 * ```
 * 示例1：
 * 输入:
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * 输出: 1->1->2->3->4->4->5->6
 * ```
 * 
 * @summary
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * 暴力法
 * 128ms 91.79%
 * 38.6mb 62.40%
 */
var mergeKLists = function(lists) {
  let listMap = {};
  let point = null;
  let head = null;
  
  // 将所有节点平铺
  lists.forEach(list => {
    point = list;

    while (point) {
      // 以 point.val 为 key 将 point 存入 map 中
      if (listMap[point.val] !== undefined) {
        listMap[point.val].push(point);
      } else {
        listMap[point.val] = [point];
      }

      point = point.next;
    }
  });

  // 排序所有节点的 val，按排序后的结果直接连成新链表
  // JS map key 会被当成字符串，直接 Object.keys() 返回的数组是按照字符串排序的，因此需要手动重排
  Object.keys(listMap).sort((a,b) => a-b).forEach(val => {
    listMap[val].forEach(node => {
      if (head) {
        point.next = node;
      } else {
        head = node;
      }

      point = node;
    });
  });

  listMap = null;
  
  return head;
};

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * 分治法
 * 116ms 97.13%
 * 38.5mb 68.42%
 */
var mergeKLists = function(lists) {
  if (!lists.length) return null;

  let amount = lists.length;
  let interval = 1;
  let i, k;
  
  // 跨步合并，精髓
  while (interval < amount) {
    k = amount - interval;
    i = 0;
    
    while (i < k) {
      lists[i] = merge2Lists(lists[i], lists[i + interval]);
      i += interval * 2;
    }

    interval *= 2;
  }

  return lists[0];
};

var merge2Lists = function(l1, l2) {
  let head = { next: null }, point = head;
  
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      point.next = l1;
      l1 = l1.next;
    } else {
      point.next = l2;
      l2 = l1;
      l1 = point.next.next;
    }
    point = point.next;
  }

  point.next = l1 ? l1 : l2;

  return head.next;
};

mergeKLists();