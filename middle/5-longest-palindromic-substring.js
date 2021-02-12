/**
 * @name 最长回文子串
 * @url https://leetcode-cn.com/problems/longest-palindromic-substring/
 * @date 2019-11-13 21:41
 * @tags 字符串、动态规划
 * @star
 * @description
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * @example
 * ```
 * 示例1：
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 示例 2：
 * 输入: "cbbd"
 * 输出: "bb"
 * ```
 * 
 * @summary
 */


/**
 * 中心扩展算法
 * @param {string} s
 * @return {string}
 * 84ms 95.76%
 * 35.4mb 87.55%
 */
var longestPalindrome = function(s) {
  if (!s) return '';

  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
};

function expandAroundCenter(s, left, right) {
  let l = left, r = right;
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }

  return r - l - 1;
}

/**
 * Manacher 算法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  // todo
};

longestPalindrome('babad');
longestPalindrome('cbbd');