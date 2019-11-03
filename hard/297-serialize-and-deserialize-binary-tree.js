/**
 * @name 二叉树的序列化与反序列化
 * @url https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
 * @tags 树、设计
 * @star
 * @description
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 * 
 * @example
 * ```
 * 示例:
 * 
 * 你可以将以下二叉树：
 * 
 *   1
 *  / \
 * 2   3
 *   / \
 *  4   5
 * 
 * 序列化为 "[1,2,3,null,null,4,5]"
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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 * 104ms 92.80%
 * 43.1mb 84.00%
 */
var serialize = function(root, str = '') {
  if (!root) return str += 'null,';

  str += root.val + ',';
  str = serialize(root.left, str);
  str = serialize(root.right, str);

  return str;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  function reDeserialize(list) {
    if (!list.length || list[0] === 'null') {
      list.length && list.shift();
      return null;
    }

    let root = new TreeNode(list[0]);
    list.shift();
    root.left = reDeserialize(list);
    root.right = reDeserialize(list);

    return root;
  } 

  data = data.replace(/,$/, '').split(',');
  return reDeserialize(data);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */