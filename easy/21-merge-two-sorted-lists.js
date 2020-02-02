/**
 * @name 合并两个有序链表
 * @url https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @tags 链表
 * @description
 * ```
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例：
 * 
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 * 
 * 
 * ```
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 68ms 91.57%
 * 35.5mb 61.12%
 */
var mergeTwoLists = function(l1, l2) {
  let dummy = new ListNode(0);
  let cur = dummy;

  
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }

  if (l1 !== null) cur.next = l1;
  if (l2 !== null) cur.next = l2;

  return dummy.next;
};