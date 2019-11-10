fs = require('fs')
path = require('path')

let data = {
  nodes: []
}

let allResult = [
  '正确',
  '错误一',
  '错误二',
  '错误三',
  '错误四',
  '错误五',
  '错误六',
]

for (let i = 0; i < 100; i ++) {
  let lng = 114.821778 + Math.random()
  let lat = 38.473088 + Math.random()
  let result = allResult[parseInt(Math.random()*(6))];
  let obj = {
    index: i,
    name: `变电站 ${i} 号`,
    location: [+lng.toFixed(6), +lat.toFixed(6)], 
    result,
  }

  data.nodes.push(obj)
}

let content = JSON.stringify(data);
let file = path.join('/Users/bofeng/Documents/GitHub/sliverswords/spirit/src/assets', 'test.json')

fs.writeFile(file, content, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('文件创建成功，地址：' + file)
})