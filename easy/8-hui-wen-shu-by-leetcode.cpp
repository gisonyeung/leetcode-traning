/**
 * @name 回文数
 * @url https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode/
 * @date 2020-01-05 11:58
 * @description
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * ```
 * 示例 1:
 * 输入: 121
 * 输出: true
 * 
 * 示例 2:
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 * 
 * 示例 3:
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * ```
 * 
 * @summary
 */

#include <limits.h>

class Solution
{
public:
  /**
   * 8ms 96.18%
   * 8mb 93.03%
   */
  bool isPalindrome(int x)
  {
    if (x < 0 || (x % 10 == 0 && x != 0))
      return false;

    int res = 0;
    while (x > res) {
      res = res * 10 + x % 10;
      x /= 10;
    }

    return x == res || x == res/10;
  }
};
