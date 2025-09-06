export const questions = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: 49.2,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    topics: ['Array', 'Hash Table'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function twoSum(nums, target) { }`,
      python: `def twoSum(nums, target): pass`,
      java: `class Solution { public int[] twoSum(int[] nums, int target) { } }`,
      cpp: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { } };`
    },
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]' },
      { input: '[3,2,4], 6', expected: '[1,2]' },
      { input: '[3,3], 6', expected: '[0,1]' },
      { input: '[-1,-2,-3,-4,-5], -8', expected: '[2,4]', hidden: true }
    ]
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    acceptance: 67.8,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    topics: ['Linked List', 'Recursion'],
    status: 'attempted',
    functionSignature: {
      javascript: `function reverseList(head) { }`,
      python: `def reverseList(head): pass`,
      java: `class Solution { public ListNode reverseList(ListNode head) { } }`,
      cpp: `class Solution { public: ListNode* reverseList(ListNode* head) { } };`
    },
    testCases: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: '[1,2]', expected: '[2,1]' },
      { input: '[]', expected: '[]' }
    ]
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    acceptance: 42.1,
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' },
      { input: 's = " "', output: 'true' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    topics: ['Two Pointers', 'String'],
    status: 'solved',
    functionSignature: {
      javascript: `function isPalindrome(s) { }`,
      python: `def isPalindrome(s): pass`,
      java: `class Solution { public boolean isPalindrome(String s) { } }`,
      cpp: `class Solution { public: bool isPalindrome(string s) { } };`
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'true' },
      { input: '"race a car"', expected: 'false' },
      { input: '" "', expected: 'true' }
    ]
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    acceptance: 50.3,
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    topics: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function maxSubArray(nums) { }`,
      python: `def maxSubArray(nums): pass`,
      java: `class Solution { public int maxSubArray(int[] nums) { } }`,
      cpp: `class Solution { public: int maxSubArray(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5,4,-1,7,8]', expected: '23' }
    ]
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    acceptance: 73.2,
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
      { input: 'root = []', output: '[]' },
      { input: 'root = [1]', output: '[1]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    topics: ['Stack', 'Tree', 'DFS', 'Binary Tree'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function inorderTraversal(root) { }`,
      python: `def inorderTraversal(root): pass`,
      java: `class Solution { public List<Integer> inorderTraversal(TreeNode root) { } }`,
      cpp: `class Solution { public: vector<int> inorderTraversal(TreeNode* root) { } };`
    },
    testCases: [
      { input: '[1,null,2,3]', expected: '[1,3,2]' },
      { input: '[]', expected: '[]' },
      { input: '[1]', expected: '[1]' }
    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    acceptance: 51.9,
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' },
      { input: 'n = 4', output: '5' }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    topics: ['Math', 'Dynamic Programming', 'Memoization'],
    status: 'solved',
    functionSignature: {
      javascript: `function climbStairs(n) { }`,
      python: `def climbStairs(n): pass`,
      java: `class Solution { public int climbStairs(int n) { } }`,
      cpp: `class Solution { public: int climbStairs(int n) { } };`
    },
    testCases: [
      { input: '2', expected: '2' },
      { input: '3', expected: '3' },
      { input: '4', expected: '5' }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: 45.6,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed in the correct order.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\''
    ],
    topics: ['Stack', 'String'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function isValid(s) { }`,
      python: `def isValid(s): pass`,
      java: `class Solution { public boolean isValid(String s) { } }`,
      cpp: `class Solution { public: bool isValid(string s) { } };`
    },
    testCases: [
      { input: '"()"', expected: 'true' },
      { input: '"()[]{}"', expected: 'true' },
      { input: '"(]"', expected: 'false' },
      { input: '"([)]"', expected: 'false' }
    ]
  },
  {
    id: 'best-time-to-buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    acceptance: 52.3,
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
      { input: 'prices = [2,4,1]', output: '2' }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    topics: ['Array', 'Dynamic Programming'],
    status: 'attempted',
    functionSignature: {
      javascript: `function maxProfit(prices) { }`,
      python: `def maxProfit(prices): pass`,
      java: `class Solution { public int maxProfit(int[] prices) { } }`,
      cpp: `class Solution { public: int maxProfit(vector<int>& prices) { } };`
    },
    testCases: [
      { input: '[7,1,5,3,6,4]', expected: '5' },
      { input: '[7,6,4,3,1]', expected: '0' },
      { input: '[2,4,1]', expected: '2' }
    ]
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    acceptance: 45.0,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    examples: [
      { input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', output: '[-3, 0, -2]' }
    ],
    constraints: [
      'Methods pop, top, getMin operations will always be called on non-empty stacks.',
      '-2^31 <= val <= 2^31 - 1',
      'At most 3 * 10^4 calls will be made.'
    ],
    topics: ['Stack', 'Design'],
    status: 'unsolved',
    functionSignature: {
      javascript: `class MinStack { constructor() { } push(val) { } pop() { } top() { } getMin() { } }`,
      python: `class MinStack:\n    def __init__(self): pass\n    def push(self, val): pass\n    def pop(self): pass\n    def top(self): pass\n    def getMin(self): pass`,
      java: `class MinStack { public MinStack() { } public void push(int val) { } public void pop() { } public int top() { } public int getMin() { } }`,
      cpp: `class MinStack { public: MinStack() { } void push(int val) { } void pop() { } int top() { } int getMin() { } };`
    },
    testCases: [
      { input: 'push(-2), push(0), push(-3), getMin()', expected: '-3' },
      { input: 'pop(), top()', expected: '0' },
      { input: 'getMin()', expected: '-2' }
    ]
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    acceptance: 64.0,
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    topics: ['Array', 'Hash Table', 'String', 'Sorting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function groupAnagrams(strs) { }`,
      python: `def groupAnagrams(strs): pass`,
      java: `class Solution { public List<List<String>> groupAnagrams(String[] strs) { } }`,
      cpp: `class Solution { public: vector<vector<string>> groupAnagrams(vector<string>& strs) { } };`
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: '[""]', expected: '[[""]]' },
      { input: '["a"]', expected: '[["a"]]' }
    ]
  },
  {
    id: 'word-search',
    title: 'Word Search',
    difficulty: 'Medium',
    acceptance: 39.0,
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters.'
    ],
    topics: ['Array', 'Backtracking', 'Matrix'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function exist(board, word) { }`,
      python: `def exist(board, word): pass`,
      java: `class Solution { public boolean exist(char[][] board, String word) { } }`,
      cpp: `class Solution { public: bool exist(vector<vector<char>>& board, string word) { } };`
    },
    testCases: [
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"', expected: 'true' },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"', expected: 'true' },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"', expected: 'false' }
    ]
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    acceptance: 44.0,
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
      { input: 'intervals = [[1,4],[0,4]]', output: '[[0,4]]' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= starti <= endi <= 10^4'
    ],
    topics: ['Array', 'Sorting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function merge(intervals) { }`,
      python: `def merge(intervals): pass`,
      java: `class Solution { public int[][] merge(int[][] intervals) { } }`,
      cpp: `class Solution { public: vector<vector<int>> merge(vector<vector<int>>& intervals) { } };`
    },
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expected: '[[1,5]]' },
      { input: '[[1,4],[0,4]]', expected: '[[0,4]]' }
    ]
  },
  {
    id: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    acceptance: 51.0,
    description: `Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's, and return the matrix.`,
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 <= m, n <= 200',
      '-2^31 <= matrix[i][j] <= 2^31 - 1'
    ],
    topics: ['Array', 'Hash Table', 'Matrix'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function setZeroes(matrix) { }`,
      python: `def setZeroes(matrix): pass`,
      java: `class Solution { public void setZeroes(int[][] matrix) { } }`,
      cpp: `class Solution { public: void setZeroes(vector<vector<int>>& matrix) { } };`
    },
    testCases: [
      { input: '[[1,1,1],[1,0,1],[1,1,1]]', expected: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: '[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', expected: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }
    ]
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    acceptance: 42.0,
    description: `Given an m x n matrix, return all elements of the matrix in spiral order.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100'
    ],
    topics: ['Array', 'Matrix', 'Simulation'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function spiralOrder(matrix) { }`,
      python: `def spiralOrder(matrix): pass`,
      java: `class Solution { public List<Integer> spiralOrder(int[][] matrix) { } }`,
      cpp: `class Solution { public: vector<int> spiralOrder(vector<vector<int>>& matrix) { } };`
    },
    testCases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1,2,3,6,9,8,7,4,5]' },
      { input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expected: '[1,2,3,4,8,12,11,10,9,5,6,7]' }
    ]
  },
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    acceptance: 70.0,
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' }
    ],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000'
    ],
    topics: ['Array', 'Math', 'Matrix'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function rotate(matrix) { }`,
      python: `def rotate(matrix): pass`,
      java: `class Solution { public void rotate(int[][] matrix) { } }`,
      cpp: `class Solution { public: void rotate(vector<vector<int>>& matrix) { } };`
    },
    testCases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', expected: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' }
    ]
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    acceptance: 63.0,
    description: `There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' },
      { input: 'm = 1, n = 10', output: '1' }
    ],
    constraints: [
      '1 <= m, n <= 100'
    ],
    topics: ['Math', 'Dynamic Programming', 'Combinatorics'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function uniquePaths(m, n) { }`,
      python: `def uniquePaths(m, n): pass`,
      java: `class Solution { public int uniquePaths(int m, int n) { } }`,
      cpp: `class Solution { public: int uniquePaths(int m, int n) { } };`
    },
    testCases: [
      { input: '3, 7', expected: '28' },
      { input: '3, 2', expected: '3' },
      { input: '1, 10', expected: '1' }
    ]
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    acceptance: 33.0,
    description: `Given a string s, return the longest palindromic substring in s.`,
    examples: [
      { input: 's = "babad"', output: '"bab"' },
      { input: 's = "cbbd"', output: '"bb"' },
      { input: 's = "a"', output: '"a"' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.'
    ],
    topics: ['String', 'Dynamic Programming'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function longestPalindrome(s) { }`,
      python: `def longestPalindrome(s): pass`,
      java: `class Solution { public String longestPalindrome(String s) { } }`,
      cpp: `class Solution { public: string longestPalindrome(string s) { } };`
    },
    testCases: [
      { input: '"babad"', expected: '"bab"' },
      { input: '"cbbd"', expected: '"bb"' },
      { input: '"a"', expected: '"a"' }
    ]
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    acceptance: 44.0,
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    topics: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function coinChange(coins, amount) { }`,
      python: `def coinChange(coins, amount): pass`,
      java: `class Solution { public int coinChange(int[] coins, int amount) { } }`,
      cpp: `class Solution { public: int coinChange(vector<int>& coins, int amount) { } };`
    },
    testCases: [
      { input: '[1,2,5], 11', expected: '3' },
      { input: '[2], 3', expected: '-1' },
      { input: '[1], 0', expected: '0' }
    ]
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    acceptance: 38.0,
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true' },
      { input: 'nums = [3,2,1,0,4]', output: 'false' },
      { input: 'nums = [0]', output: 'true' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    topics: ['Array', 'Dynamic Programming', 'Greedy'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function canJump(nums) { }`,
      python: `def canJump(nums): pass`,
      java: `class Solution { public boolean canJump(int[] nums) { } }`,
      cpp: `class Solution { public: bool canJump(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[2,3,1,1,4]', expected: 'true' },
      { input: '[3,2,1,0,4]', expected: 'false' },
      { input: '[0]', expected: 'true' }
    ]
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    acceptance: 52.0,
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
      { input: 'nums = [7,7,7,7,7,7,7]', output: '1' }
    ],
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    topics: ['Array', 'Binary Search', 'Dynamic Programming'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function lengthOfLIS(nums) { }`,
      python: `def lengthOfLIS(nums): pass`,
      java: `class Solution { public int lengthOfLIS(int[] nums) { } }`,
      cpp: `class Solution { public: int lengthOfLIS(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[10,9,2,5,3,7,101,18]', expected: '4' },
      { input: '[0,1,0,3,2,3]', expected: '4' },
      { input: '[7,7,7,7,7,7,7]', expected: '1' }
    ]
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    acceptance: 58.0,
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is "0" or "1".'
    ],
    topics: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function numIslands(grid) { }`,
      python: `def numIslands(grid): pass`,
      java: `class Solution { public int numIslands(char[][] grid) { } }`,
      cpp: `class Solution { public: int numIslands(vector<vector<char>>& grid) { } };`
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' }
    ]
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    acceptance: 62.0,
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    topics: ['Hash Table', 'String', 'Sorting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function isAnagram(s, t) { }`,
      python: `def isAnagram(s, t): pass`,
      java: `class Solution { public boolean isAnagram(String s, String t) { } }`,
      cpp: `class Solution { public: bool isAnagram(string s, string t) { } };`
    },
    testCases: [
      { input: '"anagram", "nagaram"', expected: 'true' },
      { input: '"rat", "car"', expected: 'false' }
    ]
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    acceptance: 61.0,
    description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.`,
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-2^31 <= nums[i] <= 2^31 - 1'
    ],
    topics: ['Array', 'Two Pointers'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function moveZeroes(nums) { }`,
      python: `def moveZeroes(nums): pass`,
      java: `class Solution { public void moveZeroes(int[] nums) { } }`,
      cpp: `class Solution { public: void moveZeroes(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[0,1,0,3,12]', expected: '[1,3,12,0,0]' },
      { input: '[0]', expected: '[0]' }
    ]
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    acceptance: 64.0,
    description: `Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.`,
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5 * 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Counting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function majorityElement(nums) { }`,
      python: `def majorityElement(nums): pass`,
      java: `class Solution { public int majorityElement(int[] nums) { } }`,
      cpp: `class Solution { public: int majorityElement(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[3,2,3]', expected: '3' },
      { input: '[2,2,1,1,1,2,2]', expected: '2' }
    ]
  },
  {
    id: 'longest-palindrome',
    title: 'Longest Palindrome',
    difficulty: 'Easy',
    acceptance: 55.0,
    description: `Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters. Letters are case sensitive, for example, "Aa" is not considered a palindrome here.`,
    examples: [
      { input: 's = "abccccdd"', output: '7' },
      { input: 's = "a"', output: '1' }
    ],
    constraints: [
      '1 <= s.length <= 2000',
      's consists of lowercase and/or uppercase English letters only.'
    ],
    topics: ['Hash Table', 'String', 'Greedy'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function longestPalindrome(s) { }`,
      python: `def longestPalindrome(s): pass`,
      java: `class Solution { public int longestPalindrome(String s) { } }`,
      cpp: `class Solution { public: int longestPalindrome(string s) { } };`
    },
    testCases: [
      { input: '"abccccdd"', expected: '7' },
      { input: '"a"', expected: '1' }
    ]
  },
  {
    id: 'intersection-of-two-arrays',
    title: 'Intersection of Two Arrays II',
    difficulty: 'Easy',
    acceptance: 58.0,
    description: `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result should appear as many times as it shows in both arrays and you may return the result in any order.`,
    examples: [
      { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2,2]' },
      { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', output: '[4,9]' }
    ],
    constraints: [
      '1 <= nums1.length, nums2.length <= 1000',
      '0 <= nums1[i], nums2[i] <= 1000'
    ],
    topics: ['Array', 'Hash Table', 'Two Pointers', 'Binary Search', 'Sorting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function intersect(nums1, nums2) { }`,
      python: `def intersect(nums1, nums2): pass`,
      java: `class Solution { public int[] intersect(int[] nums1, int[] nums2) { } }`,
      cpp: `class Solution { public: vector<int> intersect(vector<int>& nums1, vector<int>& nums2) { } };`
    },
    testCases: [
      { input: '[1,2,2,1], [2,2]', expected: '[2,2]' },
      { input: '[4,9,5], [9,4,9,8,4]', expected: '[4,9]' }
    ]
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    acceptance: 62.0,
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    topics: ['Array', 'Hash Table', 'Sorting'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function containsDuplicate(nums) { }`,
      python: `def containsDuplicate(nums): pass`,
      java: `class Solution { public boolean containsDuplicate(int[] nums) { } }`,
      cpp: `class Solution { public: bool containsDuplicate(vector<int>& nums) { } };`
    },
    testCases: [
      { input: '[1,2,3,1]', expected: 'true' },
      { input: '[1,2,3,4]', expected: 'false' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expected: 'true' }
    ]
  },
  {
    id: 'string-to-integer-atoi',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    acceptance: 16.0,
    description: `Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function). The algorithm for myAtoi(string s) is as follows: Read in and ignore any leading whitespace. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either one; this determines if the final result is negative or positive respectively. Assume the result is positive if neither is present. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2). If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1. Return the integer as the final result.`,
    examples: [
      { input: 's = "42"', output: '42' },
      { input: 's = "   -42"', output: '-42' },
      { input: 's = "4193 with words"', output: '4193' }
    ],
    constraints: [
      '0 <= s.length <= 200',
      's consists of English letters (lower-case and upper-case), digits (0-9), \' \', \'+\', \'-\', and \'.\'.'
    ],
    topics: ['String'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function myAtoi(s) { }`,
      python: `def myAtoi(s): pass`,
      java: `class Solution { public int myAtoi(String s) { } }`,
      cpp: `class Solution { public: int myAtoi(string s) { } };`
    },
    testCases: [
      { input: '"42"', expected: '42' },
      { input: '"   -42"', expected: '-42' },
      { input: '"4193 with words"', expected: '4193' }
    ]
  },
  {
    id: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    acceptance: 59.0,
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58' },
      { input: 's = "MCMXC"', output: '1994' }
    ],
    constraints: [
      '1 <= s.length <= 15',
      's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
    ],
    topics: ['Hash Table', 'Math', 'String'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function romanToInt(s) { }`,
      python: `def romanToInt(s): pass`,
      java: `class Solution { public int romanToInt(String s) { } }`,
      cpp: `class Solution { public: int romanToInt(string s) { } };`
    },
    testCases: [
      { input: '"III"', expected: '3' },
      { input: '"LVIII"', expected: '58' },
      { input: '"MCMXC"', expected: '1994' }
    ]
  },
  {
    id: 'plus-one',
    title: 'Plus One',
    difficulty: 'Easy',
    acceptance: 46.0,
    description: `You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zeros. Increment the large integer by one and return the resulting array of digits.`,
    examples: [
      { input: 'digits = [1,2,3]', output: '[1,2,4]' },
      { input: 'digits = [4,3,2,1]', output: '[4,3,2,2]' },
      { input: 'digits = [9]', output: '[1,0]' }
    ],
    constraints: [
      '1 <= digits.length <= 100',
      '0 <= digits[i] <= 9',
      'digits does not contain any leading zeros except for the number 0 itself.'
    ],
    topics: ['Array', 'Math'],
    status: 'unsolved',
    functionSignature: {
      javascript: `function plusOne(digits) { }`,
      python: `def plusOne(digits): pass`,
      java: `class Solution { public int[] plusOne(int[] digits) { } }`,
      cpp: `class Solution { public: vector<int> plusOne(vector<int>& digits) { } };`
    },
    testCases: [
      { input: '[1,2,3]', expected: '[1,2,4]' },
      { input: '[4,3,2,1]', expected: '[4,3,2,2]' },
      { input: '[9]', expected: '[1,0]' }
    ]
  }
];