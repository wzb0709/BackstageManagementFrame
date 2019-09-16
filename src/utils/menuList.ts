export interface IMenuItem{
  title:string
  icon?:string
  id:number
  path:string
  children:Array<IMenuItem>
  auth?:number
}



export const menuList:Array<IMenuItem> = [
  {
    title: 'dva',
    icon:'appstore',
    id:1,
    path:'main',
    children: [{
      title: '产品增删改',
      children: [],
      id:2,
      path:'list',
    }],
  },
  {
    title: 'breadcrumb',
    icon:'appstore',
    id:3,
    path:'sub',
    children: [{
      title: '例子',
      children: [],
      id:4,
      path:'list',
    }],
  },
]
