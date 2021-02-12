/**
 * @name 二叉树的前序遍历
 * @url https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 * @date 2019-09-28 14:55
 * @tags 栈、树
 * @star
 * @description
 * 给定一个二叉树，返回它的 前序 遍历。
 * 
 * @example
 * ```
 * 示例:
 * 
 * 输入: [1,null,2,3]  
 *    1
 *     \
 *      2
 *     /
 *    3 
 * 
 * 输出: [1,2,3]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * ```
 * 
 * @summary
 * 先序遍历：根节点 -> 左节点 -> 右节点
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 递归法
 * 56ms 99.60%
 * 33.5mb 88.08%
 */
var preorderTraversal = function(root) {
  if (!root) return [];

  let res = [];
  
  function traverse(node) {
    res.push(node.val);

    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }

  traverse(root);

  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 迭代法
 * 56ms 99.60%
 * 33.5mb 88.08%
 */
var preorderTraversal = function(root) {
  if (!root) return [];

  let res = [], stack = [];
  let node = root;

  stack.push(node);

  while (stack.length) {
    node = stack.pop();
    res.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return res;
};


/**
 * @param {TreeNode} root
 * @return {number[]}
 * 莫里斯遍历
 * 56ms 99.60%
 * 33.7mb 46.63%
 */
var preorderTraversal = function(root) {
  if (!root) return [];

  let res = [];
  let node = root, pre = null;

  while (node) {
    if (node.left === null) {
      res.push(node.val);
      node = node.right;
    } else {
      pre = node.left;

      while (pre.right && pre.right !== node) {
        pre = pre.right;
      }

      if (pre.right === null) {
        res.push(node.val);
        pre.right = node;
        node = node.left;
      } else {
        pre.right = null;
        node = node.right;
      }
    }
  }

  return res;
};