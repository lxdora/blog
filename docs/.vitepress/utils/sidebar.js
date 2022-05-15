const fsPromises = require('fs/promises')
const path = require('path')

async function getSidebar() {
  const sideBar = []
  const rootPath =  process.env.NODE_ENV === 'development'? '../docs' : ''
  //遍历目录
  const dirs = await fsPromises.readdir(rootPath)
  console.log({dirs})
  const realDirs = dirs.filter(item=>!item.startsWith('.'))
  console.log(realDirs)
  //遍历目录
  for(const dir of realDirs){
    //判断dir是不是目录
    const dirStat = await fsPromises.stat(path.join(rootPath,dir));
    if(dirStat.isDirectory()){
      const current = {
        text: dir,
        children: [] 
       }
      const files = await fsPromises.readdir(path.join(rootPath,dir))
      for(const file of files){
        current.children.push({
          text: path.parse(file).name, link: path.join(rootPath, dir, path.parse(file).name)
        })
      }
      sideBar.push(current)
    }
  }
  console.log(JSON.stringify(sideBar));
  return sideBar;
}

export default getSidebar;