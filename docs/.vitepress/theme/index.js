import DefaultTheme from 'vitepress/theme'
import './custom.scss'

import Docs from "./components/Docs.vue";
import Tags from "./components/Tags.vue";
import Poetry from './components/Poetry.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 注册组件
    app.component("Tags", Tags);
    app.component("Docs", Docs);
    app.component("Poetry", Poetry);
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
