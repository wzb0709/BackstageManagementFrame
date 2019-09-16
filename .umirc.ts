import { IConfig } from 'umi-types'

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  sass: {},
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'frame',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
    }],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: './index' },
        { path: '/login', component: './login/index' },
        { path: '/main/list', component: './main/index' },
        { path: '/sub', component: './sub/breadcrumb', routes: [
            { path: '/sub/list', component: './sub/index' },
            { path: '/sub/list/detail/:id', component: './sub/detail' },
          ],
        },
      ],
    },
  ],
}

export default config
