//此脚本用来创建一个默认的md文件

const path = require('path');
const fsPromises = require('fs/promises');
/**
 * param1: 文件名， 必填
 * param2: 所在文件夹， 不填则默认docs目录
 */
const params = process.argv.slice(2);
const fileName = params[0]
const filePath = params.length>1?params[1]:''
//拼接路径
createFile(fileName, filePath);


async function createFile(fileName, filePath){
  //获取当前路径
  const finalPath = path.join('./docs', filePath, fileName+'.md');
  //判断文件是否已存在
  try{
    await fsPromises.access(finalPath);
    //说明已存在该文件
    console.log('该文件已存在');
    return;
  }catch(err){
    //说明不存在该文件， 则创建
    const message = 
    `---
    title: ${fileName}
    tags:
      - 前端
    categories:
      - 技术文档
    date: ${new Date().toLocaleString('chinese',{hour12:false}).replaceAll('/', '-')}
    ---
    `
    await fsPromises.writeFile(finalPath, message);
    console.log(`创建文件${fileName}成功`);

  }
}