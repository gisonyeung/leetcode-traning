/**
 * @url https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @description
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 * @example
 * ```
 * 示例1：
 * 输入: "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 示例 2:
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 示例 3:
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是"wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke"是一个子序列，不是子串。
 * ```
 * 
 * @summary
 * 初始化一个指向矩阵左下角的，若目标值大于当前值则列数下标+1，若目标值小于当前值则行数-1，直至找到目标值或行列下标溢界。
 * 时间复杂度：O(n+m)
 * 空间复杂度：O(1)
 */

/**
 * @param {string} s
 * @return {number}
 * 160ms 40.13% 
 * 40mb 56.93%
 */
var lengthOfLongestSubstring = function(s) {
  let len = s.length;
  let ans = 0, i = 0, j = 0;
  let map = {}, currentChar;


  while (j < len) {
    currentChar = s[j];

    if (map[currentChar] !== undefined) {
      i = Math.max(map[currentChar] + 1, i);
    }

    map[currentChar] = j;
    ans = Math.max(ans, j - i + 1);
    j++;
  }

  return ans;
};


/**
 * @param {string} s
 * @return {number}
 * 108ms 92.27%
 * 39.6ms 69.02%
 */
var lengthOfLongestSubstring = function(s) {
  let subStr = ''; 
  let i, ans = 0, len = s.length;
  let subIndex = 0;

  for (i = 0; i < len; i++) {
    subIndex = subStr.indexOf(s[i]); 

    if(subIndex !== -1) {
      subStr = subStr.substring(subIndex + 1);
    }

    subStr += s[i];
    ans = subStr.length > ans ? subStr.length : ans;
  }
  return ans;
};

lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('pwwkew');