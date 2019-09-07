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
 * 方法一为滑动窗口解法，只维护 i,j 下标指针，使用 hashMap 空间，是时间复杂度很低的解法。
 * 方法二实际上就是暴力法，需要一直判断子串是否包含当前遍历字符，并需要维护子串，持续拼接子串。
 * 但运行结果来看，方法一远慢于方法二，分析以后这里有几个原因：
 * 1. 调用 Math.max 的开销比自己作判断来得要大
 * 2. 方法一中动态修改 map 长度，导致对象访问模式退化到字典模式，访问速度确实会比较慢，速度未必比子串 indexOf 高。
 * 3. 测试用例中或许大部分 case 是传入值总长度很长，但不重复子串长度比较短，导致 indexOf 效率反而比 map 高。
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