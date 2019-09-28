/**
 * @name 二叉树的层次遍历
 * @url https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 * @tags 树、广度优先搜索
 * @description
 * 给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
 * 
 * @example
 * ```
 * 例如:
 * 给定二叉树: [3,9,20,null,null,15,7],
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 
 * 返回其层次遍历结果：
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 * ```
 * 
 * @summary
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
 * @return {number[][]}
 * 递归法
 * 68ms 96.62%
 * 34.9mb 20.40%
 */
var levelOrder = function(root) {
  if (!root) return [];

  let levels = [];

  function traverse(node, level) {
    if (levels.length == level) levels.push([]);

    levels[level].push(node.val);

    if (node.left) traverse(node.left, level + 1);
    if (node.right) traverse(node.right, level + 1);
  }

  traverse(root, 0);

  return levels;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 遍历法
 * 52ms 100.00%
 * 34.7mb 33.83%
 */
var levelOrder = function(root) {
  if (!root) return [];

  let levels = [], level = 0, len = 1, i = 0;
  let queue = [root], node = null;

  while (queue.length) {
    levels.push([]);
    len = queue.length;

    for (i = 0; i < len; i++) {
      node = queue.shift();
      levels[level].push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    level++;
  }

  return levels;
};