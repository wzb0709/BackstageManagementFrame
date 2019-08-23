import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  sass:{},
  history:'hash',
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
        default: 'en-US',
      },
    }],
  ],
  routes: [
    {
      path:'/',
      component:'../layouts/index',
      routes:[
        {path:'/',component:'./index'},
        {path:'/login',component:'./login/index'},
        {path:'/main/list',component:'./main/index'},
        {path:'/sub/list',component:'./sub/index'},
      ],
    },
  ]
}

export default config;
