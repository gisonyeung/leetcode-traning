/**
 * @name 课程表 II
 * @url https://leetcode-cn.com/problems/course-schedule-ii/
 * @date 2021-02-11 10:39
 * @star
 * @tags 深度优先搜索、广度优先搜索、图、拓扑排序
 * @description
 * ```
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
 * 
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
 * 
 * 给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。
 * 
 * 可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。
 * 
 * 示例 1:
 * 
 * 输入: 2, [[1,0]] 
 * 输出: [0,1]
 * 解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 * 
 * 示例 2:
 * 
 * 输入: 4, [[1,0],[2,0],[3,1],[3,2]]
 * 输出: [0,1,2,3] or [0,2,1,3]
 * 解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 *      因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 * 
 * 
 * 说明:
 * 
 * 
 * 	输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
 * 	你可以假定输入的先决条件中没有重复的边。
 * 
 * 
 * 提示:
 * 
 * 
 * 	这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
 * 	通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
 * 	
 * 	拓扑排序也可以通过 BFS 完成。
 * 	
 * 
 * 
 * ```
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * 深度优先算法 dfs
 * 96ms 90.32%
 * 42.4mb 50.41%
 */

var findOrder = function(numCourses, prerequisites) {
  const visited = {};
  const result = [];
  const edges = {};
  let valid = true;

  function dfs(course) {
    // 将节点标记为搜索中
    visited[course] = 1;
  
    // 搜索相邻节点
    for (let i of edges[course]) {
      if (!visited[i]) {
        // 发现未搜索过的节点，则继续搜索
        dfs(i);
        if (!valid) return;
      } else if (visited[i] === 1) {
        // 发现搜索中的节点，则说明有环
        valid = false;
        return;
      }
    }
  
    // 将节点标记为已完成
    visited[course] = 2;
  
    // 将节点入栈
    result.unshift(course);
  }

  // 按照课程数，填充默认值
  for (let i = 0; i < numCourses; i++) {
    edges[i] = [];
  }

  for (let i = 0; i < prerequisites.length; i++) {
    let item = prerequisites[i];
    // { 前置课程: 后置课程 }
    edges[item[1]].push(item[0]);
  }

  // 从第一个节点，开始深度优先搜索
  for (let i = 0; i < numCourses && valid; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  if (!valid) {
    return [];
  }

  return result;
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * 广度优先算法 bfs
 * 92ms 95.58%
 * 41.2mb 90.69%
 */
var findOrder = function(numCourses, prerequisites) {
  const indeg = new Array(numCourses).fill(0);
  const result = [];
  const edges = {};
  const doneQueue = [];

  for (let i = 0; i < prerequisites.length; i++) {
    let item = prerequisites[i];
    // { 前置课程: 后置课程 }
    if (edges[item[1]]) {
      edges[item[1]].push(item[0]);
    } else {
      edges[item[1]] = [item[0]];
    }

    // 增加入度
    indeg[item[0]]++;
  }

  // 将入度为 0 的节点放到队列中
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) {
      doneQueue.push(i);
    }
  }

  while (doneQueue.length) {
    // 从队首取出一个节点
    const course = doneQueue.shift();
    // 放进答案中
    result.push(course);

    let preCourses = edges[course] || [];
    // for 循环效率比 for of 快 50 倍
    for (let i = 0; i < preCourses.length; i++) {
      const preCourse = preCourses[i];
      indeg[preCourse] = indeg[preCourse] - 1;
      // 如果相邻节点的入度为 0，则将节点接入队列中
      if (indeg[preCourse] === 0) {
        doneQueue.push(preCourse);
      }
    }
  }

  return result.length !== numCourses ? [] : result;
};

console.log(findOrder(2, [[1,0]])); // [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3] or [0,2,1,3]