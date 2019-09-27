/**
 * @name 二叉树的中序遍历
 * @url https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
 * @tags 栈、树、哈希表
 * @description
 * 给定一个二叉树，返回它的中序遍历。
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
 * 输出: [1,3,2]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * ```
 * 
 * @summary
 * （1）前序遍历：可以用来实现目录结构的显示。
 * （2）中序遍历：可以用来做表达式树，在编译器底层实现的时候用户可以实现基本的加减乘除，比如 a*b+c。
 * （3）后序遍历可以用来实现计算目录内的文件占用的数据大小。
 * 
 * 中序遍历，左节点 -> 根节点 -> 右节点
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
 * 48ms 100%
 * 33.7mb 52.25%
 */
var inorderTraversal = function(root) {
  let res = [];

  function traversal(node, res) {
    if (node !== null) {
      if (node.left !== null) {
        traversal(node.left, res);
      }
      res.push(node.val, res);
      if (node.right !== null) {
        traversal(node.right, res);
      }
    }
  }

  traversal(root);

  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 迭代法，基于栈的遍历
 * 52ms 99.91%
 * 33.6mb 56.72%
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
var inorderTraversal = function(root) {
  let res = [], stack = [];
  let curr = root;

  while (curr !== null || stack.length) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    res.push(curr.val);
    curr = curr.right;
  }

  return res;
};


/**
 * @param {TreeNode} root
 * @return {number[]}
 * 伪莫里斯遍历，借助线索二叉树
 * 60ms 97.31%
 * 33.7mb 45.90%
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
var inorderTraversal = function(root) {
  let res = [];
  let curr = root, pre = null, temp = null;

  while (curr !== null) {
    if (curr.left == null) {
      res.push(curr.val);
      curr = curr.right;
    } else {
      pre = curr.left;

      while (pre.right !== null) {
        pre = pre.right;
      }

      pre.right = curr;
      temp = curr;
      curr = curr.left;
      temp.left = null;
    }
  }

  return res;
};


/**
 * @param {TreeNode} root
 * @return {number[]}
 * 真莫里斯遍历，不破坏原有树的结构
 * 56ms 99.11%
 * 33.3mb 99.25%
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
var inorderTraversal = function(root) {
  let res = [];
  let curr = root, pre = null, temp = null;

  while (curr !== null) {
    if (curr.left == null) {
      res.push(curr.val);
      curr = curr.right;
    } else {
      pre = curr.left;

      while (pre.right !== null && pre.right !== curr) {
        pre = pre.right;
      }

      if (pre.right === null) {
        pre.right = curr;
        curr = curr.left;
        continue;
      }

      // 成环
      res.push(curr.val);
      pre.right = null;

      curr = curr.right;
    }
  }

  return res;
};

