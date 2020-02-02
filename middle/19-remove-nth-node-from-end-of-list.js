/**
 * @name 删除链表的倒数第N个节点
 * @url https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * @tags 链表、双指针
 * @description
 * ```
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 
 * 示例：
 * 
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 
 * 
 * 说明：
 * 
 * 给定的 n 保证是有效的。
 * 
 * 进阶：
 * 
 * 你能尝试使用一趟扫描实现吗？
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;
  let i = 0;

  while (first !== null) {
    first = first.next;
    if (i++ > n) {
      second = second.next;
    }
  }

  second.next = second.next.next;

  return dummy.next;
};