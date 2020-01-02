/**
 * @name 整数反转
 * @url https://leetcode-cn.com/problems/reverse-integer/
 * @description
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * ```
 * 示例 1:
 * 输入: 123
 * 输出: 321
 * 
 * 示例 2:
 * 输入: -123
 * 输出: -321
 * 
 * 示例 3:
 * 输入: 120
 * 输出: 21
 * 
 * 注意:
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 * ```
 * 
 * @summary
 */

#include <limits.h>

class Solution
{
public:
  /**
   * 8ms 38.29%
   * 8.3mb 77.21%
   */
  int reverse(int x)
  {
    int res = 0;
    while (x != 0) {
      int pop = x % 10;
      x = x / 10;

      if (res > INT_MAX / 10 || (res == INT_MAX / 10 && pop > INT_MAX % 10)) return 0;
      if (res < INT_MIN / 10 || (res == INT_MIN / 10 && pop < INT_MIN % 10)) return 0;

      res = res * 10 + pop;
    }
    return res;
  };

  /**
   * 0ms 100.00%
   * 8.2mb 82.79%
   */
  int reverse2(int x) {
    long res = 0;
    while (x != 0) {
      res = res * 10 + x % 10;
      x = x / 10;
    }

    if ((int)res != res) return 0;

    return (int)res;
  }
};

