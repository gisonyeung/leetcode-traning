/**
 * @name 找到最终的安全状态
 * @url https://leetcode-cn.com/problems/find-eventual-safe-states/
 * @date 2021-02-14 11:06
 * @tags 深度优先搜索、图
 * @description
 * ```
 * 在有向图中, 我们从某个节点和每个转向处开始, 沿着图的有向边走。 如果我们到达的节点是终点 (即它没有连出的有向边), 我们停止。
 * 
 * 现在, 如果我们最后能走到终点，那么我们的起始节点是最终安全的。 更具体地说, 存在一个自然数 K,  无论选择从哪里开始行走, 我们走了不到 K 步后必能停止在一个终点。
 * 
 * 哪些节点最终是安全的？ 结果返回一个有序的数组。
 * 
 * 该有向图有 N 个节点，标签为 0, 1, ..., N-1, 其中 N 是 graph 的节点数.  图以以下的形式给出: graph[i] 是节点 j 的一个列表，满足 (i, j) 是图的一条有向边。
 * 
 * 
 * 示例：
 * 输入：graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * 输出：[2,4,5,6]
 * 这里是上图的示意图。
 * 
 * 
 * 提示：
 * 
 * 	graph 节点数不超过 10000.
 * 	图的边数不会超过 32000.
 * 	每个 graph[i] 被排序为不同的整数列表， 在区间 [0, graph.length - 1] 中选取。
 * ```
 */

/**
 * @param {number[][]} graph
 * @return {number[]}
 * 反向图
 * 200ms 27.27%
 * 48.6mb 27.27%
 */
var eventualSafeNodes = function(graph) {
  const outDegree = [];
  const safe = [];
  const queue = [];
  const rGraph = []; // { 后置节点: 前置节点 }

  for (let i = 0; i < graph.length; i++) {
    outDegree[i] = graph[i].length;

    if (outDegree[i] === 0) {
      safe.push(i);
      queue.push(i);
    } else {
      for (let j = 0; j < outDegree[i]; j++) {
        let v = graph[i][j];
        rGraph[v] ? rGraph[v].push(i) : (rGraph[v] = [i]);
      }
    }
  }

  while (queue.length) {
    let v = queue.pop();
    let preGraph = rGraph[v] || [];

    for (let i = 0; i < preGraph.length; i++) {
      outDegree[preGraph[i]] -= 1;

      if (outDegree[preGraph[i]] === 0) {
        safe.push(preGraph[i]);
        queue.push(preGraph[i]);
      }
    }
  }

  return safe.sort((a, b) => a - b);
};

/**
 * @param {number[][]} graph
 * @return {number[]}
 * 深度搜索
 * 132ms 100.00%
 * 45.9mb 81.82%
 */
var eventualSafeNodes = function(graph) {
  let len = graph.length;
  const visitStatus = new Array(len).fill(0); // 0:未访问 1:访问中 2:已结束
  const safe = [];

  for (let i = 0; i < len; i++) {
    dfs(i);
  }

  for (let i = 0; i < len; i++) {
    if (visitStatus[i] === 2) {
      safe.push(i);
    }
  }

  function dfs(i) {
    if (visitStatus[i] !== 0) return visitStatus[i] === 2;

    visitStatus[i] = 1;
    for (let j = 0; j < graph[i].length; j++) {
      if (!dfs(graph[i][j])) return false;
    }
    visitStatus[i] = 2;

    return true;
  }

  return safe;
};

console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])); // [2,4,5,6]
console.log(eventualSafeNodes([[],[0,2,3,4],[3],[4],[]])); // [0,1,2,3,4]