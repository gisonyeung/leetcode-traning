/**
 * @name 验证二叉搜索树
 * @url https://leetcode-cn.com/problems/validate-binary-search-tree/
 * @tags 树、深度优先搜索
 * @star
 * @description
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * 
 * 假设一个二叉搜索树具有如下特征：
 * - 节点的左子树只包含小于当前节点的数。
 * - 节点的右子树只包含大于当前节点的数。
 * - 所有左子树和右子树自身必须也是二叉搜索树。
 * 
 * @example
 * ```
 * 示例 1:
 * 
 * 输入:
 *     2
 *    / \
 *   1   3
 * 输出: true
 * 示例 2:
 * 
 * 输入:
 *     5
 *    / \
 *   1   4
 *      / \
 *     3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 *      根节点的值为 5 ，但是其右子节点值为 4 。
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
 * @return {boolean}
 * 递归法
 * 64ms 99.65%
 * 37.1mb 93.08%
 */
var isValidBST = function(root) {
  function helper(node, lower, upper) {
    if (node == null) return true;

    if (lower != null && node.val <= lower) return false;
    if (upper != null && node.val >= upper) return false;

    if (!helper(node.right, node.val, upper)) return false;
    if (!helper(node.left, lower, node.val)) return false;

    return true;
  }

  return helper(root, null, null);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 迭代法
 * 76ms 96.64%
 * 37.9mb 31.45%
 */
var isValidBST = function(root) {
  let node = root, lower = null, upper = null;
  let stack= [];

  stack.push([root, lower, upper]);

  while (stack.length) {
    [node, lower, upper] = stack.pop();

    if (node == null) continue;

    if (lower != null && node.val <= lower) return false;
    if (upper != null && node.val >= upper) return false;

    stack.push([node.right, node.val, upper]);
    stack.push([node.left, lower, node.val]);
  }

  return true;
};


/**
 * @param {TreeNode} root
 * @return {boolean}
 * 中序遍历
 * 68ms 99.12%
 * 37.2mb 83.65%
 */
var isValidBST = function(root) {
  let stack = [], node = root;
  let lastVal = -Infinity;

  while (stack.length || node != null) {
    while (node != null) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    
    if (node.val <= lastVal) return false;

    lastVal = node.val;
    node = node.right;
  }

  return true;
};