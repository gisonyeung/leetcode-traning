/**
 * @name 二叉树的后序遍历
 * @url https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
 * @date 2019-09-28 16:44
 * @tags 栈、树
 * @star
 * @description
 * 给定一个二叉树，返回它的 后序 遍历。
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
 * 输出: [3,2,1]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * ```
 * 
 * @summary
 * 后序遍历：左节点 -> 右节点 -> 根节点
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
 * 52ms 99.80%
 * 33.7mb 27.05%
 */
var postorderTraversal = function(root) {
  if (!root) return [];

  let res = [];
  
  function traverse(node) {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);

    res.push(node.val);
  }

  traverse(root);
  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 迭代法，深度搜索 + 逆序输出
 * 52ms 99.680%
 * 33.7mb 49.18%
 */
var postorderTraversal = function(root) {
  if (!root) return [];

  let res = [], stack = [root];
  let node = root;

  while (stack.length) {
    node = stack.pop();
    res.unshift(node.val);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return res;
};


/**
 * @param {TreeNode} root
 * @return {number[]}
 * 莫里斯遍历 + 逆序输出
 * 52ms 99.80%
 * 33.5mb 72.13%
 */
var postorderTraversal = function(root) {
  if (!root) return [];

  let res = [];
  let node = root, pre = null;

  while (node) {
    if (node.right === null) {
      res.unshift(node.val);
      node = node.left;
    } else {
      pre = node.right;

      while (pre.left && pre.left !== node) {
        pre = pre.left;
      }

      if (pre.left == null) {
        res.unshift(node.val);
        pre.left = node;
        node = node.right;
      } else {
        pre.left = null;
        node = node.left;
      }
    }
  }

  return res;
};

