/**
 * @name 编辑距离
 * @url https://leetcode-cn.com/problems/edit-distance/
 * @tags 字符串、动态规划
 * @description
 * ```
 * 给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。
 * 
 * 你可以对一个单词进行如下三种操作：
 * 
 * 
 * 	插入一个字符
 * 	删除一个字符
 * 	替换一个字符
 * 
 * 
 * 示例 1:
 * 
 * 输入: word1 = "horse", word2 = "ros"
 * 输出: 3
 * 解释: 
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 * 
 * 
 * 示例 2:
 * 
 * 输入: word1 = "intention", word2 = "execution"
 * 输出: 5
 * 解释: 
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 * 
 * 
 * ```
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * 88ms 94.29%
 * 37.5mb 95.76% 
 */
var minDistance = function(word1, word2) {
  let m = word1.length, n = word2.length;

  if ( n * m == 0) return n + m;

  let dp = new Array(m + 1);

  // 初始化第一行
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1);
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      let left = dp[i][j-1];
      let up = dp[i-1][j];
      let left_up = dp[i-1][j-1];

      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = Math.min(left, up, left_up) + 1;
      }
    }
  }

  return dp[m][n];
};

minDistance('horse', 'ros');
minDistance('a', 'a');
minDistance('ab', 'a');
minDistance('zoologicoarchaeologist', 'zoogeologist');
