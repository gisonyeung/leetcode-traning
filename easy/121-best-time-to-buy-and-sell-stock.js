/**
 * @name 买卖股票的最佳时机
 * @url https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 * @date 2019-09-02 20:02
 * @description
 * 给定一个数组，它的第`i`个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 * 注意你不能在买入股票前卖出股票。
 * 
 * @example
 * ```
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * (注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。)
 * 
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * ```
 * 
 * @summary
 * 一次遍历，保存谷底值和最大利润值。
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (var i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (maxProfit < prices[i] - minPrice) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
};

maxProfit([7, 1, 5, 3, 6, 4]);
maxProfit([7, 6, 4, 3, 1]);