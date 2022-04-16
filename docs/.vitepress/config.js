import getPages from './utils/pages'

async function getConfig() {
  let config =  {
    title: '记录',
    description: '记路',
    lastUpdated: true,
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/medium-zoom',
      '@vuepress/nprogress',
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
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
        { text: 'Vue.js设计与实现读书笔记', link: '/vue/Vue.js设计与实现' },
      ]
    },
    {
      text: '工具',
      children: [
        { text: 'element-ui自定义修改', link: '/tools/element-ui不常规用法' },
        { text: 'git的使用', link: '/tools/git冷门记录' },
        { text: 'Restful', link: '/tools/RESTful风格' },
        { text: 'uni-app问题记录', link: '/tools/uniapp' },
        { text: 'nginx的使用', link: '/tools/nginx的使用' },
        { text: 'linux常用命令', link: '/tools/linux常用命令' },
        
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