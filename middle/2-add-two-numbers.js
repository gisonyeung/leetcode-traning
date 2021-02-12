/**
 * @name 两数相加
 * @url https://leetcode-cn.com/problems/add-two-numbers/
 * @date 2020-01-31 20:28
 * @tags 链表、数学
 * @description
 * ```
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例：
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 * 
 * ```
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 124ms 89.34%
 * 38.3mb 83.58%
 */
var addTwoNumbers = function(l1, l2) {
  let p = l1, q = l2;
  let sumHead = new ListNode(0);
  let carry = 0;
  let curr = sumHead;

  while (p !== null || q !== null) {
    let x = p !== null ? p.val : 0;
    let y = q !== null ? q.val : 0;
    let sum = carry + x + y;

    if (sum >= 10) {
      carry = 1;
      sum = sum % 10;
    } else {
      carry = 0;
    }

    curr.next = new ListNode(sum);
    curr = curr.next;

    p = p ? p.next : null;
    q = q ? q.next : null; 
  }

  if (carry > 0) curr.next = new ListNode(carry);

  return sumHead.next;
};

