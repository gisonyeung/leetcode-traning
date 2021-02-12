/**
 * @name 鸡蛋掉落
 * @url https://leetcode-cn.com/problems/super-egg-drop/
 * @date 2019-09-02 20:02
 * @star
 * @description
 * 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
 * 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
 * 你知道存在楼层`F`，满足`0 <= F <= N 任何从高于 F`的楼层落下的鸡蛋都会碎，从`F`楼层或比它低的楼层落下的鸡蛋都不会破。
 * 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层`X`扔下（满足`1 <= X <= N`）。
 * 你的目标是确切地知道 F 的值是多少。
 * 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
 * 
 * tips: 1 <= K <= 100, 1 <= N <= 10000
 * 
 * @example
 * ```
 * 输入：K = 1, N = 2
 * 输出：2
 * 解释：
 * 鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
 * 否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
 * 如果它没碎，那么我们肯定知道 F = 2 。
 * 因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
 * 
 * 输入：K = 2, N = 6
 * 输出：3
 * 
 * 输入：K = 3, N = 14
 * 输出：4
 * ```
 * 
 * @summary
 * 二分查找 + 动态规划
 * 时间复杂度：O(KNlogN)
 * 空间复杂度：O(KN)
 */

/**
 * 二分查找 + 动态规划
 * 时间复杂度：O(KNlogN)
 * 空间复杂度：O(KN)
 * 224ms 
 * 46.3mb
 * 
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N) {
  let cache = {};

  let dp = (K, N) => {
    let cacheKey = K + '-' + N;
    if (cache[cacheKey] !== undefined) return cache[cacheKey];

    if (N === 0) return 0;
    if (K === 1) return N;

    let low = 1, high = N;
    let t1, t2, middle;
    while (low + 1 < high) {
      middle = Math.floor((low + high) / 2);
      t1 = superEggDrop(K - 1, middle - 1);
      t2 = superEggDrop(K, N - middle);

      if (t1 < t2) {
        low = middle;
      } else if (t1 > t2) {
        high = middle;
      } else {
        low = high = middle;
      }
    }

    let minimun = 1 + Math.min(
      Math.max(superEggDrop(K - 1, low - 1), superEggDrop(K, N - low)),
      Math.max(superEggDrop(K - 1, high - 1), superEggDrop(K, N - high)),
    );

    cache[cacheKey] = minimun;

    return minimun;
  };

  return dp(K,N);
};


/** 
 * 自底向上基于最优策略的动态规划，每一次计算都基于上一次的计算结果
 * 时间复杂度：O(KN)
 * 空间复杂度：O(KN)
 * 176ms
 * 41mb
 * 
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N) {
  // 只有一个鸡蛋时，楼层数即是步数
  // dp[i] => dp(1,i)
  let dp = [];
  for (let i = 0; i <= N; i++) {
    dp[i] = i;
  }

  // 多个鸡蛋的时候
  // dp2[i] => dp(k,i)
  let x, dp2 = [];
  let k, n;
  for (k = 2; k <= K; k++) {
    dp2 = new Array(N + 1).fill(0);
    x = 1;

    // 该鸡蛋数不变的条件下，从 x=1 第一楼开始逐步检查 n 个楼层需要的最大次数
    for (n = 1; n <= N; n++) {
      // 找到 dp2[n] = dp(k, n)
      // max(dp[x-1], dp2[n-x]) > max(dp[x], dp2[n-x-1])
      // 相当于 
      // max(T1(x-1), T2(x-1)) > max(T1(x), T2(x))
      // x 代表楼层数，不断增加楼层数，找到最佳答案（线段交点）
      while (x < n && Math.max(dp[x - 1], dp2[n - x]) > Math.max(dp[x], dp2[n - x - 1]))
        x++;

      // 该鸡蛋数该楼层数，最优解保存下来
      dp2[n] = 1 + Math.max(dp[x - 1], dp2[n - x]);
    }

    dp = dp2;
  }

  return dp[N];
};

/** 
 * 递推法，假设 K 个鸡蛋下，求出用 m 步最多能分辨 aux 楼层，当 aux[K] >= N 时，m 就是目标值了。
 * 时间复杂度：O(KN)
 * 空间复杂度：O(K)
 * 52ms
 * 33.7mb
 * 
 * 
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N) {
  if (N <= 2 || K === 1) return N;
  const aux = new Array(K + 1).fill(1);
  aux[0] = 0;
  let m = 1; // 初始步数
  while (aux[K] < N) { // 当鸡蛋数还没尝试到目标楼层时，继续尝试
    m++;
    for (let e = K; e > 0; e--) {
      // 将 “2个鸡蛋走2步” 简写为 2E2，现求 2E2 能检测的最大楼层
      // 每次扔鸡蛋，有碎或者不碎两种情况，现我们有 2 个鸡蛋：
      // 1. 若鸡蛋碎了，则手上鸡蛋减 1 并且需要往下面的楼层走，所以此时相当于这步白走了，即 1E1
      // 2. 若鸡蛋没碎，则手上鸡蛋数目不变，此时我们对比 2E1 来说多检测了一层，即 2E1 + 1
      // 所以得出下面递推公式，e为鸡蛋数，m为当前步数：f[e][m] = f[e][m-1] + f[e-1][m-1] + 1
      // 代入 e = 2，m = 2（两个鸡蛋走两步）得，f[2][2] = f[2][1] + f[1][1] + 1
      aux[e] = aux[e] + aux[e - 1] + 1;
    }
  }
  return m;
};





superEggDrop(2,6);
superEggDrop(3,14);