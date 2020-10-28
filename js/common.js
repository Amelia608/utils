// element-ui  el-cascader  根据选择任意一级选项  倒推整个层级从而进行反选

function getTreeDeepArr(key, treeData) {
  let arr = []; // 在递归时操作的数组
  let returnArr = []; // 存放结果的数组
  let depth = 0; // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN; // 将执行的层级赋值 到 全局层级

      arr[depthN] = childrenData[j].id;

      if (childrenData[j].id == key) {
        // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
        break;
      } else {
        if (childrenData[j].children) {
          depth++;
          childrenEach(childrenData[j].children, depth);
        }
      }
    }
    return returnArr;
  }
  return childrenEach(treeData, depth);
}
var treeData = [
  {
    id: 1,
    children: [
      {
        id: 3,
      },
      {
        id: 4,
        children: [
          {
            id: 5,
            children: [
              {
                id: 6,
              },
              {
                id: 8,
              },
            ],
          },
        ],
      },
      {
        id: 7,
      },
      {
        id: 12,
        children: [
          {
            id: 13,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        id: 9,
        children: [
          {
            id: 10,
          },
        ],
      },
    ],
  },
  {
    id: 11,
  },
];
console.log(getTreeDeepArr(1, treeData)); // [1]
console.log(getTreeDeepArr(3, treeData)); // [1, 3]
console.log(getTreeDeepArr(5, treeData)); // [1, 4, 5]
