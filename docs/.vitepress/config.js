const env = process.env.NODE_ENV === "development" ? "" : "/blog"
import getPages from './utils/pages'

async function getConfig() {
  let config =  {
    title: '记录',
    base: env,
    description: '记路',
    lastUpdated: true,
    markdown: {
      lineNumbers: true
    },
    themeConfig: {
      docsDir: 'docs',
      docsBranch: 'main',
      lastUpdated: 'Last Updated',
      sidebar: {
        '/': getSidebar()
      },
      pages: await getPages(),
      nav: [
        { text: "🏠 首页", link: "/index" },
        { text: "📅 归档", link: "/more/docs" },
        { text: "📂 分类", link: "/more/tags" },
      ],
    }
  }
  return config;
}

function getSidebar() {
  return [
    {
      text: 'HTML',
      children: [
        
      ]
    },
    {
      text: 'CSS',
      children: [
        { text: 'css常用样式', link: '/css/css冷门记录' },
      ]
    },
    {
      text: 'JavaScript',
      children: [
        { text: 'nodeJs的使用', link: '/javascript/nodeJs' },
      ]
    },
    {
      text: 'Vue',
      children: [
        
      ]
    },
    {
      text: '工具',
      children: [
        { text: 'element-ui自定义修改', link: '/tools/element-ui不常规用法' },
        { text: 'git的使用', link: '/tools/git冷门记录' },
        { text: 'Restful', link: '/tools/RESTful风格' },
        { text: 'uni-app问题记录', link: '/tools/uniapp' },
        
      ]
    },
    {
      text: '其他',
      children: [
        { text: 'Restful', link: '/other/frontmatter' },
       
      ]
    },
  ]
}

module.exports = getConfig();